let btn = document.querySelector('.fa-eye')

btn.addEventListener('click', () => {
  let inputSenha = document.querySelector('#senha')

  if (inputSenha.getAttribute('type') == 'password') {
    inputSenha.setAttribute('type', 'text')
  } else {
    inputSenha.setAttribute('type', 'password')
  }
})

async function entrar() {
  const emailOrCpf = document.getElementById('email').value;
  const senha = document.getElementById('senha').value;

  try {
    const response = await fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ emailOrCpf, senha })
    });

    const result = await response.json();

    if (response.ok) {
      localStorage.setItem('emailOrCpf', emailOrCpf); // Salvar no localStorage para usar na próxima página

      // Enviar o código de verificação para o telefone
      const codigoResponse = await fetch('http://localhost:3000/enviar-codigo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ emailOrCpf })
      });

      const codigoResult = await codigoResponse.json();
      if (codigoResponse.ok) {
        // Redirecionar para a página de verificação
        window.location.href = './verificacao.html';
      } else {
        document.getElementById('msgError').innerHTML = `<strong>${codigoResult.message}</strong>`;
      }
    } else {
      document.getElementById('msgError').innerHTML = `<strong>${result.message}</strong>`;
    }
  } catch (error) {
    console.error('Erro ao realizar login:', error);
  }
}
