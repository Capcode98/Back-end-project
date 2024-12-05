document.getElementById('input-arquivo').addEventListener('change', function (evento) {
  const arquivo = evento.target.files[0];

  if (arquivo && arquivo.name.endsWith('.csv')) {
    const formData = new FormData();
    formData.append('arquivo', arquivo);

    fetch('http://localhost:3000/upload-csv', {
      method: 'POST',
      body: formData,
    })
      .then((response) => {
        console.log('Resposta bruta do servidor:', response); // Verifica o status e conteúdo da resposta
    
        if (!response.ok) {
          // Se o status não for 2xx, lançamos um erro
          throw new Error(`Erro no servidor: ${response.status} - ${response.statusText}`);
        }
        
        return response.json(); // Processa o JSON apenas se a resposta for OK
      })
      .then((data) => {
        console.log('Dados retornados:', data); // Dados retornados pelo servidor
    
        if (data.message) {
          alert(data.message); // Exibe o alerta com a mensagem do servidor
        }
      })
      .catch((error) => {
        console.error('Erro ao enviar arquivo:', error);
        alert('Arquivo enviado com sucesso.');
      });
    
  } else {
    alert('Por favor, selecione um arquivo CSV.');
  }
});
