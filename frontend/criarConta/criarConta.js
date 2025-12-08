// criarConta.js

function criarConta() {
    // Pegando os valores dos inputs
    const nome = document.getElementById('nome_pessoa').value.trim();
    const email = document.getElementById('email_pessoa').value.trim();
    const senha = document.getElementById('senha_pessoa').value;
    const confirmarSenha = document.getElementById('confirmarSenha').value;
    const cpf = document.getElementById('cpf_pessoa').value.trim();
    const resposta = document.getElementById('respostaDoServidor');

    // Validações básicas
    if (!nome || !email || !senha || !confirmarSenha || !cpf) {
        resposta.textContent = "Preencha todos os campos!";
        resposta.style.color = "red";
        return;
    }

    if (senha !== confirmarSenha) {
        resposta.textContent = "As senhas não coincidem!";
        resposta.style.color = "red";
        return;
    }

    // Validar CPF (apenas formato simples, 11 dígitos numéricos)
    const cpfNumeros = cpf.replace(/\D/g, ''); // remove tudo que não for número
    if (cpfNumeros.length !== 11) {
        resposta.textContent = "CPF inválido! Deve ter 11 números.";
        resposta.style.color = "red";
        return;
    }

    // Checar se já existe um usuário com o mesmo email ou CPF
    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    const usuarioExistente = usuarios.find(u => u.email === email || u.cpf === cpfNumeros);
    if (usuarioExistente) {
        resposta.textContent = "Já existe uma conta com este email ou CPF!";
        resposta.style.color = "red";
        return;
    }

    // Criar novo usuário
    const novoUsuario = {
        nome,
        email,
        senha,
        cpf: cpfNumeros
    };

    usuarios.push(novoUsuario);
    localStorage.setItem('usuarios', JSON.stringify(usuarios));

    resposta.textContent = "Conta criada com sucesso!";
    resposta.style.color = "green";

    // Limpar campos
    document.getElementById('nome_pessoa').value = '';
    document.getElementById('email_pessoa').value = '';
    document.getElementById('senha_pessoa').value = '';
    document.getElementById('confirmarSenha').value = '';
    document.getElementById('cpf_pessoa').value = '';
}
