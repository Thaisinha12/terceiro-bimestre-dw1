const form = document.getElementById("form-pagamento");
const numeroInput = document.getElementById("numero");
const mensagem = document.getElementById("mensagem");

// Formatar número do cartão automaticamente
numeroInput.addEventListener("input", () => {
  let valor = numeroInput.value.replace(/\D/g, "");
  valor = valor.replace(/(\d{4})(?=\d)/g, "$1 ");
  numeroInput.value = valor.trim();
});

// Algoritmo de Luhn (validação real do cartão)
function validarNumeroCartao(numero) {
  let soma = 0;
  let deveDobrar = false;

  for (let i = numero.length - 1; i >= 0; i--) {
    let digito = parseInt(numero[i]);
    if (deveDobrar) {
      digito *= 2;
      if (digito > 9) digito -= 9;
    }
    soma += digito;
    deveDobrar = !deveDobrar;
  }

  return soma % 10 === 0;
}

// Impedir números no nome do cartão
const nomeInput = document.getElementById("nome");
nomeInput.addEventListener("input", () => {
  nomeInput.value = nomeInput.value.replace(/[0-9]/g, ""); // remove qualquer número digitado
});

// Campo de validade (MM/AA) — valida mês e ano real
const validadeInput = document.getElementById("validade");

validadeInput.addEventListener("input", (e) => {
  let valor = e.target.value.replace(/\D/g, ""); // remove tudo que não for número

  // limita a 4 números
  if (valor.length > 4) valor = valor.slice(0, 4);

  // adiciona a barra automaticamente
  if (valor.length >= 3) valor = valor.slice(0, 2) + "/" + valor.slice(2);
  e.target.value = valor;
});

// Validação e envio
form.addEventListener("submit", async (e) => { // Tornar a função assíncrona
    e.preventDefault();

    const nome_cartao = document.getElementById("nome").value.trim(); // Renomeado para nome_cartao
    const numero_cartao = numeroInput.value.replace(/\s/g, ""); // Renomeado para numero_cartao
    const validade = document.getElementById("validade").value;
    const cvv = document.getElementById("cvv").value;
    const tipo_cartao = document.getElementById("tipo").value; // Renomeado para tipo_cartao
    
    // --- Dados que precisam ser definidos/obtidos (EXEMPLOS) ---
    // Você precisará obter o pedido_id_pedido e o valor_total_pagamento
    // de alguma forma (variáveis de escopo, campos ocultos, etc.)
    const dadosPagamento = JSON.parse(sessionStorage.getItem("dadosPagamento")) || {};
    const pedido_id_pedido = Number(dadosPagamento.id_pedido);
    const valor_total_pagamento = Number(dadosPagamento.valor_total);

console.log("ID do pedido recebido:", pedido_id_pedido);
console.log("Valor total recebido:", valor_total_pagamento);

    const data_pagamento = new Date().toISOString(); // Data atual
    // O id_pagamento é geralmente gerado automaticamente pelo banco de dados (remover se for o caso)
    // Se o banco não gerar, você precisará definir um:
    // const id_pagamento = Math.floor(Math.random() * 1000000); 

    // Verifica campos vazios
    if (!nome_cartao || !numero_cartao || !validade || !cvv || !tipo_cartao) {
        mensagem.textContent = "Preencha todos os campos.";
        mensagem.style.color = "red";
        return;
    }
    
    // ... [Restante das suas validações (validade, CVV, Luhn) ] ...
    
    // Verifica formato da validade (MM/AA)
    const validadeLimpa = validade.replace("/", "");
    if (validadeLimpa.length !== 4) {
        mensagem.textContent = "A validade deve conter 4 números (MM/AA).";
        mensagem.style.color = "red";
        return;
    }

    const [mes, ano] = validade.split("/").map(Number);
    const dataAtual = new Date();
    const anoAtual = dataAtual.getFullYear() % 100;
    const mesAtual = dataAtual.getMonth() + 1;

    if (mes < 1 || mes > 12) {
        mensagem.textContent = "Mês inválido na validade (01 a 12).";
        mensagem.style.color = "red";
        return;
    }

    if (ano < anoAtual || (ano === anoAtual && mes < mesAtual)) {
        mensagem.textContent = "Validade vencida.";
        mensagem.style.color = "red";
        return;
    }

    // Limpa espaços da validade
    const validadeFormatada = validade; // mantém "MM/AA"

    // Validação do CVV — exatamente 3 números
    if (!/^\d{3}$/.test(cvv)) {
        mensagem.textContent = "CVV deve conter exatamente 3 dígitos.";
        mensagem.style.color = "red";
        return;
    }

    // Validação do número do cartão
    if (!validarNumeroCartao(numero_cartao)) {
        mensagem.textContent = "Número de cartão inválido.";
        mensagem.style.color = "red";
        return;
    }
    
    // Prepara os dados para envio
  const dadosPagamentoFinal = {
    pedido_id_pedido,
    nome_cartao,
    numero_cartao,
    validade: validadeFormatada,
    cvv,
    tipo_cartao,
    data_pagamento,
    valor_total_pagamento
};


    // --- Lógica de envio para a API ---
    try {
        const response = await fetch('/pagamento', { // Altere a URL se o endpoint for diferente
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dadosPagamentoFinal)
        });

        const data = await response.json();

        if (response.ok) {
            mensagem.textContent = `Compra finalizada com sucesso no cartão de ${tipo_cartao}!`;
            mensagem.style.color = "green";
            form.reset();
        } else {
            // Tratar erros da API (como NOT NULL, ID duplicado, etc.)
            mensagem.textContent = `❌ Erro ao processar pagamento: ${data.error || 'Erro desconhecido.'}`;
            mensagem.style.color = "red";
        }

    } catch (error) {
        console.error('Erro de rede ou na requisição:', error);
        mensagem.textContent = "❌ Erro de conexão com o servidor. Tente novamente.";
        mensagem.style.color = "red";
    }
});