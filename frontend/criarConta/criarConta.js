function criarConta() {
    const nome = document.getElementById('nome_pessoa').value.trim();
    const email = document.getElementById('email_pessoa').value.trim();
    const senha = document.getElementById('senha_pessoa').value;
    const confirmarSenha = document.getElementById('confirmarSenha').value;
    const cpf = document.getElementById('cpf_pessoa').value.trim();
    const endereco = document.getElementById('endereco_cliente').value.trim();
    const resposta = document.getElementById('respostaDoServidor');

    if (!nome || !email || !senha || !confirmarSenha || !cpf || !endereco) {
        resposta.textContent = "Preencha todos os campos!";
        resposta.style.color = "red";
        return;
    }

    if (senha !== confirmarSenha) {
        resposta.textContent = "As senhas não coincidem!";
        resposta.style.color = "red";
        return;
    }

    const cpfNumeros = cpf.replace(/\D/g, '');
    if (cpfNumeros.length !== 11) {
        resposta.textContent = "CPF inválido! Deve ter 11 números.";
        resposta.style.color = "red";
        return;
    }

    // Faz a requisição para o backend
    fetch('http://localhost:3001/criarConta', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, email, senha, cpf: cpfNumeros, endereco })
    })
    .then(res => res.json())
    .then(data => {
        if (data.erro) {
            resposta.textContent = data.erro;
            resposta.style.color = "red";
        } else {
            resposta.textContent = "Conta criada com sucesso!";
            resposta.style.color = "green";

            // Salva login automático igual ao login normal
localStorage.setItem(
    "usuarioLogado",
    JSON.stringify({ email: email, nome: nome })
);
localStorage.setItem("nomeUsuario", nome);


            // Limpa campos
            document.getElementById('nome_pessoa').value = '';
            document.getElementById('email_pessoa').value = '';
            document.getElementById('senha_pessoa').value = '';
            document.getElementById('confirmarSenha').value = '';
            document.getElementById('cpf_pessoa').value = '';
            document.getElementById('endereco_cliente').value = '';

        // --- LOGIN AUTOMÁTICO APÓS CRIAR A CONTA ---
localStorage.setItem("usuarioLogado", email);
localStorage.setItem("nomeUsuario", nome);

// Atualiza o menu para já aparecer o nome
try {
    exibirNomeNoMenu(nome);
} catch (e) {
    console.warn("exibirNomeNoMenu ainda não existe nesta página");
}
            
        //Redirecionamento automático
        setTimeout(() => {
            if (email.endsWith("@email.gerente.com")) {
                window.location.href = "http://localhost:3001/menu.html";
            } else {
                window.location.href = "http://localhost:3001/menu.html";
            }
        }, 0);
        }
    })
    .catch(err => {
        resposta.textContent = "Erro ao criar conta!";
        resposta.style.color = "red";
        console.error(err);
    });
}
