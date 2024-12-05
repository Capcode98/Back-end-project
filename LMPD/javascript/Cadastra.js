let btn = document.querySelector('#verSenha');
let btnConfirm = document.querySelector('#verConfirmSenha');

let nome = document.querySelector('#nome');
let labelNome = document.querySelector('#labelNome');
let validNome = false;

let email = document.querySelector('#email');
let labelEmail = document.querySelector('#labelEmail');
let validEmail = false;

let CPF = document.querySelector('#CPF');
let labelCPF = document.querySelector('#labelCPF');
let validCPF = false;

let Telefone = document.querySelector('#Telefone');
let labelTelefone = document.querySelector('#labelTelefone');
let validTelefone = false;

let senha = document.querySelector('#senha');
let labelSenha = document.querySelector('#labelSenha');
let validSenha = false;

let confirmSenha = document.querySelector('#confirmSenha');
let labelConfirmSenha = document.querySelector('#labelConfirmSenha');
let validConfirmSenha = false;

let msgError = document.querySelector('#msgError');
let msgSuccess = document.querySelector('#msgSuccess');

nome.addEventListener('keyup', () => {
  if(nome.value.length <= 6){
    labelNome.setAttribute('style', 'color: red');
    labelNome.innerHTML = 'Digite seu nome completo.';
    nome.setAttribute('style', 'border-color: red');
    validNome = false;
  } else {
    labelNome.setAttribute('style', 'color: green');
    labelNome.innerHTML = 'Nome';
    nome.setAttribute('style', 'border-color: green');
    validNome = true;
  }
});

Telefone.addEventListener('keyup', () => {
  // Remover todos os caracteres não numéricos, exceto o '+' (para garantir o formato correto)
  let TelefoneValue = Telefone.value.replace(/\D/g, '');

  // Garantir que o +55 esteja fixo no início e que o DDD e número possam ser inseridos
  if (TelefoneValue.length === 0) {
    Telefone.value = '+55'; // Apenas o +55 fixo
  } else if (TelefoneValue.length <= 2) {
    Telefone.value = `+55${TelefoneValue}`; // Inclui o DDD
  } else if (TelefoneValue.length <= 11) {
    Telefone.value = `+55${TelefoneValue.substr(2)}`; // Formata o telefone após o DDD
  }

  // Verifica se o telefone possui entre 13 e 14 caracteres (incluindo +55 e o DDD)
  if (TelefoneValue.length < 13 || TelefoneValue.length > 14) {
    labelTelefone.setAttribute('style', 'color: red');
    labelTelefone.innerHTML = 'Insira um número válido: +55 DDD + 9 números';
    Telefone.setAttribute('style', 'border-color: red');
    validTelefone = false;
  } else {
    labelTelefone.setAttribute('style', 'color: green');
    labelTelefone.innerHTML = 'Telefone';
    Telefone.setAttribute('style', 'border-color: green');
    validTelefone = true;
  }
});

Telefone.addEventListener('focus', () => {
  // Verifica se o valor já tem o +55 ao focar no campo
  if (Telefone.value === '') {
    Telefone.value = '+55';
  }
});

Telefone.addEventListener('keydown', (event) => {
  // Impede que o backspace apague o +55
  if (Telefone.selectionStart <= 3 && event.key === 'Backspace') {
    event.preventDefault();
  }
});



CPF.addEventListener('keyup', () => {
  const CPFValue = CPF.value.replace(/\D/g, '');// Remove tudo que não é dígito

  if (CPFValue.length !== 11) {
    labelCPF.setAttribute('style', 'color: red');
    labelCPF.innerHTML = 'CPF Inválido.';
    CPF.setAttribute('style', 'border-color: red');
    validCPF = false;
  } else {
    labelCPF.setAttribute('style', 'color: green');
    labelCPF.innerHTML = 'CPF';
    CPF.setAttribute('style', 'border-color: green');
    validCPF = true;
  }
});

email.addEventListener('keyup', () => {
  const emailValue = email.value;

  if (!emailValue.includes('@') || !emailValue.includes('.') || emailValue.indexOf('@') === 0 || emailValue.indexOf('@') === emailValue.length - 1 || emailValue.indexOf('.') < emailValue.indexOf('@') + 1) {
    labelEmail.setAttribute('style', 'color: red');
    labelEmail.innerHTML = 'Insira um E-Mail válido.'; 
    email.setAttribute('style', 'border-color: red');
    validEmail = false;
  } else {
    labelEmail.setAttribute('style', 'color: green');
    labelEmail.innerHTML = 'E-mail'; 
    email.setAttribute('style', 'border-color: green');
    validEmail = true;
  }
});

senha.addEventListener('keyup', () => {
  if(senha.value.length <= 5){
    labelSenha.setAttribute('style', 'color: red');
    labelSenha.innerHTML = 'Senha *Insira no minimo 6 caracteres';
    senha.setAttribute('style', 'border-color: red');
    validSenha = false;
  } else {
    labelSenha.setAttribute('style', 'color: green');
    labelSenha.innerHTML = 'Senha';
    senha.setAttribute('style', 'border-color: green');
    validSenha = true;
  }
});

confirmSenha.addEventListener('keyup', () => {
  if(senha.value != confirmSenha.value){
    labelConfirmSenha.setAttribute('style', 'color: red');
    labelConfirmSenha.innerHTML = 'Confirmar Senha *As senhas não conferem';
    confirmSenha.setAttribute('style', 'border-color: red');
    validConfirmSenha = false;
  } else {
    labelConfirmSenha.setAttribute('style', 'color: green');
    labelConfirmSenha.innerHTML = 'Confirmar Senha';
    confirmSenha.setAttribute('style', 'border-color: green');
    validConfirmSenha = true;
  }
});

async function cadastrar() {
  if (validNome && validEmail && validCPF && validTelefone && validSenha && validConfirmSenha) {
    try {
      const response = await fetch('http://localhost:3000/cadastrar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nome: nome.value,
          email: email.value,
          cpf: CPF.value,
          telefone: Telefone.value,
          senha: senha.value,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        msgSuccess.setAttribute('style', 'display: block');
        msgSuccess.innerHTML = '<strong>Usuário cadastrado com sucesso!</strong>';
        msgError.setAttribute('style', 'display: none');
        
        setTimeout(() => {
          window.location.href = "./Login.html";
        }, 1300);
      } else {
        // Exibe a mensagem de erro enviada pelo servidor
        msgError.setAttribute('style', 'display: block');
        msgError.innerHTML = `<strong>${result.message}</strong>`;
        msgSuccess.setAttribute('style', 'display: none');
      }
    } catch (error) {
      msgError.setAttribute('style', 'display: block');
      msgError.innerHTML = '<strong>Erro ao cadastrar usuário.</strong>';
      msgSuccess.setAttribute('style', 'display: none');
      console.error('Erro:', error);
    }
  } else {
    msgError.setAttribute('style', 'display: block');
    msgError.innerHTML = '<strong>Preencha todos os campos corretamente antes de cadastrar</strong>';
    msgSuccess.setAttribute('style', 'display: none');
  }
}


btn.addEventListener('click', () => {
  let inputSenha = document.querySelector('#senha');
  
  if(inputSenha.getAttribute('type') == 'password') {
    inputSenha.setAttribute('type', 'text');
  } else {
    inputSenha.setAttribute('type', 'password');
  }
});

btnConfirm.addEventListener('click', () => {
  let inputConfirmSenha = document.querySelector('#confirmSenha');

  if(inputConfirmSenha.getAttribute('type') == 'password') {
    inputConfirmSenha.setAttribute('type', 'text');
  } else {
    inputConfirmSenha.setAttribute('type', 'password');
  }
});


//FUNÇÃO PARA ENVIAR O CÓDIGO
async function enviarCodigo() {
  const emailOrCpf = document.getElementById('emailOrCpf').value;

  try {
    const response = await fetch('http://localhost:3000/enviar-codigo', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ emailOrCpf })
    });

    const result = await response.json();

    if (response.ok) {
      alert(result.message); // Exibir mensagem de código enviado
      // Exibir campo para o usuário inserir o código
    } else {
      alert(result.message); // Mensagem de erro caso falhe
    }
  } catch (error) {
    console.error('Erro ao enviar código:', error);
  }
}


