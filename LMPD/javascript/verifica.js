//FUNÇÃO PARA ENVIAR O CÓDIGO
async function enviarCodigo() {
    const emailOrCpf = localStorage.getItem('emailOrCpf'); // Recupera o e-mail ou CPF do localStorage
  
    if (!emailOrCpf) {
      alert('Não foi possível recuperar seu e-mail ou CPF.');
      return;
    }
  
    try {
      const response = await fetch('http://localhost:3000/enviar-codigo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ emailOrCpf })
      });
  
      const result = await response.json();
  
      if (response.ok) {
        alert(result.message); // Código enviado com sucesso
      } else {
        alert(result.message); // Mensagem de erro
      }
    } catch (error) {
      console.error('Erro ao enviar código:', error);
    }
  }
  
  //FUNÇÃO PARA VERIFICAR O CÓDIGO
  async function verificarCodigo() {
    const emailOrCpf = localStorage.getItem('emailOrCpf'); // Recupera o e-mail ou CPF do localStorage
    const codigoVerificacao = document.getElementById('codigoVerificacao').value;
  
    if (!emailOrCpf) {
      alert('Não foi possível recuperar seu e-mail ou CPF.');
      return;
    }
  
    try {
      const response = await fetch('http://localhost:3000/verificar-codigo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ emailOrCpf, codigoVerificacao })
      });
  
      const result = await response.json();
  
      if (response.ok) {
        alert(result.message); // Verificação bem-sucedida
        window.location.href = './indexCadastrado.html'; // Redirecionar para a página principal
      } else {
        alert(result.message); // Código incorreto ou expirado
      }
    } catch (error) {
      console.error('Erro ao verificar código:', error);
    }
  }
  