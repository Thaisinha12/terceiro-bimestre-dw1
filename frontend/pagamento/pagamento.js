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
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const nome = document.getElementById("nome").value.trim();
  const numero = numeroInput.value.replace(/\s/g, "");
  const validade = document.getElementById("validade").value;
  const cvv = document.getElementById("cvv").value;
  const tipo = document.getElementById("tipo").value;

  // Verifica campos vazios
  if (!nome || !numero || !validade || !cvv || !tipo) {
    mensagem.textContent = "Preencha todos os campos.";
    mensagem.style.color = "red";
    return;
  }

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

  // Validação do CVV — exatamente 3 números
  if (!/^\d{3}$/.test(cvv)) {
    mensagem.textContent = "CVV deve conter exatamente 3 dígitos.";
    mensagem.style.color = "red";
    return;
  }

  // Validação do número do cartão
  if (!validarNumeroCartao(numero)) {
    mensagem.textContent = "Número de cartão inválido.";
    mensagem.style.color = "red";
    return;
  }

  mensagem.textContent = `✅ Compra finalizada com sucesso no cartão de ${tipo}!`;
  mensagem.style.color = "green";

  form.reset();
});
