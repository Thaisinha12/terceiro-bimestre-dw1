const itensCarrinhoContainer = document.getElementById('itens-carrinho');
const precoTotalElement = document.getElementById('preco-total');
const urlProdutos = 'http://localhost:3001/produto';
const urlCarrinho = 'http://localhost:3001/carrinho'; // rota para o carrinho

// Função para formatar o valor em moeda BRL
function formatarMoeda(valor) {
  return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

// Buscar os produtos do carrinho (IDs e quantidades)
async function buscarCarrinho() {
  try {

//pegar os dados do local storage


    const resp = await fetch(urlCarrinho);
    if (!resp.ok) throw new Error(`Erro HTTP ${resp.status}`);
    return await resp.json(); // exemplo: [{ id_produto: 1, quantidade: 2 }, ...]
  } catch (err) {
    console.error('Erro ao buscar carrinho:', err);
    itensCarrinhoContainer.innerHTML = '<p class="carrinho-vazio" style="color:red;">Erro ao carregar carrinho.</p>';
    return [];
  }
}

// Buscar todos os produtos da API
async function buscarProdutos() {
  try {
    const resp = await fetch(urlProdutos);
    if (!resp.ok) throw new Error(`Erro HTTP ${resp.status}`);
    return await resp.json(); // [{ id_produto, nome_produto, preco_produto }]
  } catch (err) {
    console.error('Erro ao buscar produtos:', err);
    return [];
  }
}

// Montar carrinho com base nas duas rotas
async function montarCarrinho() {
  itensCarrinhoContainer.innerHTML = '<p class="carrinho-vazio">Carregando...</p>';

  const [produtos, carrinho] = await Promise.all([
    buscarProdutos(),
    buscarCarrinho()
  ]);

  if (!carrinho.length) {
    itensCarrinhoContainer.innerHTML = '<p class="carrinho-vazio">Seu carrinho está vazio!</p>';
    precoTotalElement.textContent = formatarMoeda(0);
    return;
  }

  itensCarrinhoContainer.innerHTML = '';
  let total = 0;

  carrinho.forEach(item => {
    const produto = produtos.find(p => p.id_produto === item.id_produto);
    if (!produto) return;

    const subtotal = item.quantidade * parseFloat(produto.preco_produto);
    total += subtotal;

    const div = document.createElement('div');
    div.classList.add('item-carrinho');
    div.innerHTML = `
      <span class="nome-produto">${produto.nome_produto}</span>
      <span class="quantidade">Qtd: ${item.quantidade}</span>
      <span class="preco-item">${formatarMoeda(subtotal)}</span>
      <button class="btn-remover" data-id="${produto.id_produto}">X</button>
    `;
    itensCarrinhoContainer.appendChild(div);
  });

  precoTotalElement.textContent = formatarMoeda(total);
  adicionarEventListeners();
}

// Remover produto do carrinho
async function removerItem(idProduto) {
  try {
    await fetch(`${urlCarrinho}/${idProduto}`, { method: 'DELETE' });
    montarCarrinho(); // recarrega
  } catch (err) {
    console.error('Erro ao remover produto:', err);
  }
}

function adicionarEventListeners() {
  document.querySelectorAll('.btn-remover').forEach(btn => {
    btn.addEventListener('click', () => removerItem(btn.dataset.id));
  });

  const comprarBtn = document.querySelector('.btn-comprar');
  if (comprarBtn) {
    comprarBtn.addEventListener('click', () => {
      alert('Compra finalizada com sucesso!');
      window.location.href = '../pagamento/pagamento.html';
    });
  }
}

// Inicialização
document.addEventListener('DOMContentLoaded', montarCarrinho);
