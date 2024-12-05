# PROJETO BACK-END
## DESCRIÇÃO DO PROJETO
- #### Este projeto foi proposto para a Disciplina PROJETO DE DESENVOLVIMENTO WEB BACK END - 5º/6° Período.
### PROJETO DE ANALISE DE DADOS ESTUDANTIS
- #### Esse projeto foi e está sendo desenvolvido pelos alunos do grupo 2 de Ciências da Computação da UNIFESO.

    #### EQUIPE 2

    - ##### PO: *[Lucas Rodrigues Lourenço](https://www.linkedin.com/in/lucas-rodrigues-44a707282/)*
    - ##### ScrumMaster: *[Lucas do Canto de Carvalho](https://www.linkedin.com/in/lucas-do-canto-de-carvalho-7bb2a4279/)*
    - ##### Dev-Back_end: *[João Luis Berute](https://www.linkedin.com/in/joao-luis-berute-ribeiro/)*
    - ##### Dev-Front_end1: *[Marcos Vinicius da costa silva](https://www.linkedin.com/in/marcos-vinicius-costa-silva-853ab2285/)*
    - ##### Dev-Front_end2: *[Pedro Henrique SantAna de Souza](https://www.linkedin.com/in/pedro-henrique-453b9b26a/)*
    - ##### QA: *[Diego Moreira da Silva](https://www.linkedin.com/in/diego-moreira-387a5b335/)*

#
# TECNOLOGIAS UTILIZADAS
- # BACK-END
    - ## Node.js
        Node.js é um software de código aberto, multiplataforma, baseado no interpretador V8 do Google e que permite a execução de códigos JavaScript fora de um navegador web.
        - ### Express
            Framework minimalista para Node.js que facilita a criação de servidores web e APIs, com suporte para rotas, middlewares e gerenciamento de solicitações e respostas HTTP.
        - ### Pg
            Biblioteca para interação com bancos de dados PostgreSQL em Node.js, permitindo realizar conexões, executar consultas SQL e manipular dados de forma eficiente.
        - ### Body-parser 
            Middleware usado para processar o corpo das solicitações HTTP, como JSON ou dados enviados em formulários, tornando-os acessíveis no req.body.
        - ### Cors 
            Middleware que habilita o compartilhamento de recursos entre diferentes origens (CORS) em aplicações web, necessário para APIs que interagem com front-ends hospedados em outros domínios.
        - ### Twilio 
            Biblioteca para integrar serviços de comunicação da Twilio, como envio de mensagens SMS, realização de chamadas de voz e uso de APIs de comunicação.
        - ### Multer 
            Middleware para manipulação de uploads de arquivos em Node.js, permitindo o processamento e armazenamento eficiente de arquivos enviados por formulários multipart.
        - ### Csv-parser 
            Biblioteca para leitura e análise de arquivos CSV em streams, facilitando a conversão de dados em formato tabular para objetos JavaScript.
        - ### Chart.js 
            Biblioteca de gráficos baseada em JavaScript que permite criar visualizações interativas e personalizáveis, como gráficos de linha, barra e pizza, em aplicações web.

    - ## PostgreSQL 
        PostgreSQL é um sistema de gerenciamento de banco de dados relacional (RDBMS) de código aberto, conhecido por sua robustez, extensibilidade e conformidade com os padrões SQL. Ele foi originalmente criado em 1986 no projeto POSTGRES, na Universidade da Califórnia, em Berkeley, e desde então evoluiu para uma das ferramentas mais confiáveis para o gerenciamento de dados
#

### Funcionalidades
- Criação de usuários
- Leitura de usuários
- Atualização de usuários
- Exclusão de usuários
- Visualização de tabelas 
- Upload de arquivo .csv
- Criação de dashboards

### Requisitos Básicos
- [node.js](https://nodejs.org/pt/download/package-manager)
- [postgre](https://www.postgresql.org/download/)
- [git](https://git-scm.com/downloads)

### Instalação
#### Passo 1 - Clone o repositorio 
- Abra o terminal do windows e escreva na barra de pesquisa o seguinte comando:

        CMD 
    ou 

        Prompt de Comando

- Vá para a pasta aonde você pretende fazer o download deste repositório com o seguinte comando:

        cd "Nome_da_pasta"

- Clone o projeto com o seguinte comando:

        git clone https://github.com/Capcode98/back-end.git
    

- Instale as dependências necessarias do projeto, com o seguinte comando:

        npm install express
        npm install pg
        npm install body-parser
        npm install cors
        npm install twilio
        npm install multer
        npm install csv-parser
        npm install chart.js


- Vá para dentro do projeto com o seguinte comando:

        cd LMPD


- Navegue até o diretório do projeto onde o arquivo server.js está localizado. Execute:

        npm install

Isso instalará todas as dependências mencionadas no projeto (express, pg, cors, twilio, etc.).

- Rodar o servidor No diretório do projeto, execute:

        node server.js
        
O servidor rodará na porta 3000, como configurado no código. Acesse http://localhost:3000 para interagir com o servidor.
