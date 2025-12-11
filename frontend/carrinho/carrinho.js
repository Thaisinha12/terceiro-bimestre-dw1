
function formatarPreco(valor) {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 2 });
}

function carregarCarrinho() {
    const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    const corpo = document.getElementById('corpo-tabela');
    const totalGeral = document.getElementById('total-geral');
    corpo.innerHTML = '';
    let total = 0;

    if (carrinho.length === 0) {
        // CORREÇÃO: ZERA O TOTAL NA INTERFACE QUANDO O CARRINHO ESTÁ VAZIO
        totalGeral.textContent = `Total: ${formatarPreco(0)}`;
        corpo.innerHTML = `<tr><td colspan="6" style="text-align:center;">Seu carrinho está vazio.</td></tr>`;
        document.getElementById('btn-finalizar').disabled = true;
        document.getElementById('btn-limpar').disabled = true;
        return;
    }

    carrinho.forEach((item, index) => {
        const subtotal = item.preco * item.quantidade;
        total += subtotal;

        const linha = document.createElement('tr');
        linha.innerHTML = `
          <td>${item.id}</td>
          <td>${item.nome}</td>
          <td>
            <input type="number" min="1" step="1" value="${item.quantidade}" onchange="atualizarQuantidade(${index}, this.value)">
          </td>
          <td>${formatarPreco(item.preco)}</td>
          <td>${formatarPreco(subtotal)}</td>
          <td><button class="btn-remover" onclick="removerItem(${index})">Remover</button></td>
        `;
        corpo.appendChild(linha);
    });

    totalGeral.textContent = `Total: ${formatarPreco(total)}`;
    document.getElementById('btn-finalizar').disabled = false;
    document.getElementById('btn-limpar').disabled = false;
}

function removerItem(index) {
    const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    carrinho.splice(index, 1);
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    carregarCarrinho();
}

function atualizarQuantidade(index, novaQtd) {
    const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    carrinho[index].quantidade = parseInt(novaQtd);
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    carregarCarrinho();
}

function limparCarrinho() {
    if (confirm("Tem certeza que deseja limpar todo o carrinho?")) {
        localStorage.removeItem('carrinho');
        carregarCarrinho();
    }
}

function finalizarPedido() {
    const  carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    let usuarioRaw = localStorage.getItem("usuarioLogado");

    // Se estiver salvo errado como texto simples, converte para JSON válido
if (usuarioRaw && !usuarioRaw.startsWith("{")) {
    usuarioRaw = JSON.stringify({ email: usuarioRaw });
    localStorage.setItem("usuarioLogado", usuarioRaw);
}


if (!usuarioRaw) {
    alert("Você precisa estar logado para finalizar o pedido!");
    window.location.href = "http://localhost:3001/login/login.html";
    return;
}

const usuario = JSON.parse(usuarioRaw);

// Também impede objetos vazios:
if (!usuario.email) {
    alert("Você precisa estar logado para finalizar o pedido!");
    window.location.href = "http://localhost:3001/login/login.html";
    return;
}


    if (carrinho.length === 0) {
        alert("Seu carrinho está vazio."); 
        return;
    }
    window.location.href = "http://localhost:3001/finalizar/finalizar.html";
}

document.getElementById('btn-finalizar').addEventListener('click', finalizarPedido);
document.getElementById('btn-limpar').addEventListener('click', limparCarrinho);
window.onload = carregarCarrinho;