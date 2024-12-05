import express from 'express';
import pkg from 'pg'; 
const { Pool } = pkg;
import bodyParser from 'body-parser';
import cors from 'cors';
import twilio from 'twilio';
import multer from 'multer';
import fs from 'fs';
import csvParser from 'csv-parser';


const app = express();
const port = 3000;
app.use(cors());
app.use(bodyParser.json());


const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'LMPD',
  password: '#abc123#',
  port: 5432,
});

// Rota para cadastrar usuário
app.post('/cadastrar', async (req, res) => {
  const { nome, email, cpf, senha, telefone } = req.body;

  try {
    // Verificar se o e-mail, CPF ou telefone já existe no banco de dados
    const verificaUsuario = await pool.query(
      'SELECT * FROM cliente.user WHERE email = $1 OR cpf = $2 OR telefone = $3',
      [email, cpf, telefone]
    );

    if (verificaUsuario.rows.length > 0) {
      return res.status(400).json({ message: 'Usuário já cadastrado.' });
    }

    // Garantir que o número de telefone esteja formatado com o código do Brasil (+55)
    let telefoneFormatado = telefone;

    // Adicionar o prefixo +55 caso não tenha
    if (!telefoneFormatado.startsWith('+55')) {
      telefoneFormatado = '+55' + telefoneFormatado.replace(/\D/g, ''); // Remove qualquer caractere não numérico
    }

    // Inserir o novo usuário caso não exista
    await pool.query(
      'INSERT INTO cliente.user (nome, cpf, email, senha, telefone) VALUES ($1, $2, $3, $4, $5)',
      [nome, cpf, email, senha, telefoneFormatado]
    );

    res.status(201).json({ message: 'Usuário cadastrado com sucesso!' });
  } catch (error) {
    console.error('Erro ao cadastrar usuário:', error);
    res.status(500).json({ message: 'Erro ao cadastrar usuário' });
  }
});

// Rota para login de usuário
app.post('/login', async (req, res) => {
  const { emailOrCpf, senha } = req.body;

  try {
    const query = `
      SELECT id, nome, email, cpf, telefone
      FROM cliente.user
      WHERE (email = $1 OR cpf = $1) AND senha = $2
    `;
    const values = [emailOrCpf, senha];
    const result = await pool.query(query, values);

    if (result.rows.length > 0) {
      const user = result.rows[0];
      res.status(200).json({ message: 'Login realizado com sucesso', user });
    } else {
      res.status(401).json({ message: 'E-mail/CPF ou senha incorretos' });
    }
  } catch (error) {
    console.error('Erro ao realizar login:', error);
    res.status(500).json({ message: 'Erro ao realizar login' });
  }
});

// Função para gerar o código de verificação
function gerarCodigoVerificacao() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// Rota para enviar o código para o cliente via SMS
app.post('/enviar-codigo', async (req, res) => {
  const { emailOrCpf } = req.body;

  try {
    const result = await pool.query(
      'SELECT id, telefone FROM cliente.user WHERE email = $1 OR cpf = $1',
      [emailOrCpf]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Usuário não encontrado.' });
    }

    const user = result.rows[0];
    const codigo = gerarCodigoVerificacao();
    const expiracao = new Date(Date.now() + 5 * 60 * 1000); // O código expira em 5 minutos

    // Armazenar o código e a expiração no banco de dados
    await pool.query(
      'INSERT INTO cliente.user_verification (user_id, codigo_verificacao, expiracao) VALUES ($1, $2, $3) ON CONFLICT (user_id) DO UPDATE SET codigo_verificacao = $2, expiracao = $3',
      [user.id, codigo, expiracao]
    );

    // Enviar o código via SMS (com um número válido da Twilio)
    await client.messages.create({
      from: '+12512024147', // Substitua com seu número SMS Twilio
      name: 'LMPD',
      to: user.telefone,    // Número do usuário (certifique-se de formatar corretamente)
      body: `Seu código de verificação é: ${codigo}`,
    });

    res.status(200).json({ message: 'Código de verificação enviado via SMS.' });
  } catch (error) {
    console.error('Erro ao enviar código:', error);
    res.status(500).json({ message: 'Erro ao enviar código de verificação.' });
  }
});

// Rota para verificar o código enviado ao usuário
app.post('/verificar-codigo', async (req, res) => {
  const { emailOrCpf, codigoVerificacao } = req.body;

  if (!emailOrCpf || !codigoVerificacao) {
    return res.status(400).json({ message: 'Email/CNPJ ou código de verificação são necessários.' });
  }

  try {
    // Verifica se o usuário existe
    const result = await pool.query(
      'SELECT id FROM cliente.user WHERE email = $1 OR cpf = $1',
      [emailOrCpf]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Usuário não encontrado.' });
    }

    const userId = result.rows[0].id;

    // Busca o código de verificação e a expiração
    const codigoResult = await pool.query(
      'SELECT codigo_verificacao, expiracao FROM cliente.user_verification WHERE user_id = $1',
      [userId]
    );

    if (codigoResult.rows.length === 0) {
      return res.status(400).json({ message: 'Código de verificação inválido.' });
    }

    const { codigo_verificacao, expiracao } = codigoResult.rows[0];

    // Verifica se o código de verificação é válido e se não expirou
    if (codigo_verificacao === codigoVerificacao && new Date() < new Date(expiracao)) {
      return res.status(200).json({ message: 'Verificação bem-sucedida. Login autorizado.' });
    } else {
      return res.status(400).json({ message: 'Código de verificação incorreto ou expirado.' });
    }
  } catch (error) {
    console.error('Erro ao verificar código:', error);
    return res.status(500).json({ message: 'Erro ao verificar código.' });
  }
});



// Definindo a rota para WEB
app.get('./index.html', (req, res) => {
  res.send('Bem-vindo à aplicação!'); // Mensagem que aparecerá ao acessar a raiz
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});


// Configuração do multer para upload de arquivos
const upload = multer({
  dest: './uploads/', // Certifique-se de que a pasta existe
  limits: { fileSize: 10 * 1024 * 1024 }, // Limite de 10 MB
});

// Rota para upload do arquivo CSV
app.post('/upload-csv', upload.single('arquivo'), async (req, res) => {
  const arquivo = req.file;

  if (!arquivo) {
    console.error('Nenhum arquivo enviado.');
    return res.status(400).json({ message: 'Nenhum arquivo foi enviado.' });
  }

  console.log(`Arquivo recebido: ${arquivo.path}`);

  try {
    const resultados = [];

    // Lê e processa o arquivo CSV
    const stream = fs.createReadStream(arquivo.path).pipe(csvParser());

    for await (const row of stream) {
      resultados.push(row);
    }

    // Inserir os dados na tabela alunocurso
    for (const linha of resultados) {
      const { nome_aluno, curso, materia, media_nota } = linha;

      // Verificar se 'media_nota' existe e é uma string antes de aplicar o 'replace'
      let notaFormatada = null;
      if (media_nota && typeof media_nota === 'string') {
        // Substituir vírgula por ponto, se necessário
        notaFormatada = parseFloat(media_nota.replace(',', '.'));
      }

      if (isNaN(notaFormatada)) {
        console.warn(`Média de nota inválida para o aluno ${nome_aluno}: ${media_nota}`);
        continue; // Pula para o próximo aluno se a média de nota for inválida
      }

      await pool.query(
        'INSERT INTO dadoscursos.alunocurso (nome_aluno, curso, materia, media_nota) VALUES ($1, $2, $3, $4)',
        [nome_aluno, curso, materia, notaFormatada]
      );
    }

    console.log('Dados salvos no banco.');
    fs.unlinkSync(arquivo.path); // Apaga o arquivo após salvar
    res.status(201).json({ message: 'Arquivo processado e dados salvos com sucesso.' });
  } catch (error) {
    console.error('Erro ao processar o arquivo CSV:', error);
    res.status(500).json({ message: 'Erro ao processar o arquivo.' });
  }
});

/*analise dos dados*/ 

app.get('/dados-graficos', async (req, res) => {
  try {
      const query = `
          SELECT curso, ROUND(AVG(media_nota), 2) as media
          FROM dadoscursos.alunocurso
          GROUP BY curso
          ORDER BY curso;
      `;
      const result = await pool.query(query);
      res.json(result.rows);
  } catch (err) {
      console.error(err);
      res.status(500).send('Erro ao buscar dados');
  }
});

/* Número de alunos por curso */
app.get('/numero-alunos', async (req, res) => {
  try {
      const query = `
          SELECT curso, 
                 COUNT(*) as numero_alunos
          FROM dadoscursos.alunocurso
          GROUP BY curso
          ORDER BY curso;
      `;
      const result = await pool.query(query);

      // Ajuste para retornar os dados no formato desejado para 2023 e 2024
      const data = result.rows.map(item => ({
        curso: item.curso,
        alunos_2023: item.numero_alunos,  // Usando o mesmo número para 2023 e 2024
        alunos_2024: item.numero_alunos   // Usando o mesmo número para 2023 e 2024
      }));

      res.json(data);  // Retorna os dados em formato JSON
  } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Erro ao buscar dados' });  // Responde com JSON em caso de erro
  }
});

/* Dados para a tabela (Curso, Matéria, Média de Nota) */
app.get('/dados-tabela', async (req, res) => {
  try {
      const query = `
          SELECT curso, materia, media_nota
          FROM dadoscursos.alunocurso
          ORDER BY curso, materia;
      `;
      const result = await pool.query(query);
      res.json(result.rows);  // Retorna os dados em formato JSON
  } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Erro ao buscar dados para a tabela' });
  }
});
