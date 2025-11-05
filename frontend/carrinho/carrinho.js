const itensCarrinhoContainer = document.getElementById('itens-carrinho');
const precoTotalElement = document.getElementById('preco-total');
const urlDaApi = 'http://localhost:3001/produto/';

// Variáveis para armazenar o estado global
let produtosAPI = []; // Armazena todos os produtos da API
let itensSalvos = []; // Armazena ID e quantidade do LocalStorage
let produtosCarrinhoRenderizaveis = []; // Lista final com todos os dados para renderização

// **********************************************
// FUNÇÕES DE GESTÃO DO CARRINHO (LocalStorage)
// **********************************************

// Função que busca os itens salvos no LocalStorage (apenas ID e Quantidade)
function getItensSalvos() {
    const carrinhoJson = localStorage.getItem('carrinhoItens');
    return carrinhoJson ? JSON.parse(carrinhoJson) : [];
}

// Função que salva a lista atual de itens no LocalStorage.
function salvarCarrinho() {
    // Salva APENAS ID e Quantidade
    const itensParaSalvar = produtosCarrinhoRenderizaveis.map(p => ({
        id: p.id,
        quantidade: p.quantidade
    }));
    localStorage.setItem('carrinhoItens', JSON.stringify(itensParaSalvar));
}

// Função para formatar o valor para moeda BRL
function formatarMoeda(valor) {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

// **********************************************
// NOVO: FUNÇÕES DE BUSCA E PROCESSAMENTO
// **********************************************

// 1. Função para buscar todos os produtos da API
async function buscarProdutosAPI() {
    try {
        const response = await fetch(urlDaApi);
        if (!response.ok) {
            throw new Error(`Erro HTTP: Status ${response.status}`);
        }
        const dadosAPI = await response.json();
        // Mapeia os dados da API para um formato mais fácil de buscar (usando Map ou Array.find)
        produtosAPI = dadosAPI.map(p => ({
            id: p.id_produto,
            nome: p.nome_produto,
            // Certifica-se de que o preço é um número para cálculos
            precoUnitario: parseFloat(p.preco_produto) 
        }));
    } catch (error) {
        console.error("Erro ao buscar dados da API:", error);
        itensCarrinhoContainer.innerHTML = '<p class="carrinho-vazio" style="color: red;">Erro ao carregar o catálogo de produtos da API.</p>';
        produtosAPI = [];
    }
}

// 2. Função para juntar dados do LocalStorage com dados da API
function montarCarrinhoParaRenderizacao() {
    itensSalvos = getItensSalvos();
    produtosCarrinhoRenderizaveis = [];

    itensSalvos.forEach(itemSalvo => {
        const produtoInfo = produtosAPI.find(p => p.id === itemSalvo.id);
        
        if (produtoInfo) {
            // Se o produto for encontrado na API, cria o objeto completo para renderizar
            produtosCarrinhoRenderizaveis.push({
                id: itemSalvo.id,
                nome: produtoInfo.nome,
                precoUnitario: produtoInfo.precoUnitario,
                quantidade: itemSalvo.quantidade
            });
        }
        // Nota: Itens salvos no LocalStorage que não existem mais na API serão ignorados.
    });
}


// **********************************************
// FUNÇÕES DE AÇÃO DO CARRINHO (JÁ EXISTENTES)
// **********************************************

// 3. Função para renderizar (desenhar) os itens na tela
function renderizarCarrinho() {
    itensCarrinhoContainer.innerHTML = ''; 

    if (produtosCarrinhoRenderizaveis.length === 0) {
        itensCarrinhoContainer.innerHTML = '<p class="carrinho-vazio">Seu carrinho está vazio!</p>';
        calcularTotal();
        return;
    }

    produtosCarrinhoRenderizaveis.forEach(produto => {
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('item-carrinho');
        itemDiv.dataset.id = produto.id;

        const precoTotalItem = produto.precoUnitario * produto.quantidade;

        itemDiv.innerHTML = `
            <span class="nome-produto">${produto.nome}</span>
            <div class="quantidade-controle">
                <button class="btn-quantidade" data-acao="diminuir" data-id="${produto.id}">-</button>
                <span class="quantidade-valor">${produto.quantidade}</span>
                <button class="btn-quantidade" data-acao="aumentar" data-id="${produto.id}">+</button>
            </div>
            <span class="preco-item">${formatarMoeda(precoTotalItem)}</span>
            <button class="btn-remover" data-id="${produto.id}">X</button>
        `;

        itensCarrinhoContainer.appendChild(itemDiv);
    });

    calcularTotal();
    adicionarEventListeners();
}

// 4. Função para calcular e exibir o preço total do carrinho
function calcularTotal() {
    const total = produtosCarrinhoRenderizaveis.reduce((soma, produto) => {
        return soma + (produto.precoUnitario * produto.quantidade);
    }, 0);
    
    precoTotalElement.textContent = formatarMoeda(total);
}

// 5. Função para remover um item
function removerItem(id) {
    const idNum = parseInt(id);
    produtosCarrinhoRenderizaveis = produtosCarrinhoRenderizaveis.filter(produto => produto.id !== idNum);
    salvarCarrinho(); // Salva a alteração no LocalStorage
    renderizarCarrinho(); // Redesenha
}

// 6. Função para alterar a quantidade
function alterarQuantidade(id, acao) {
    const idNum = parseInt(id);
    const produto = produtosCarrinhoRenderizaveis.find(p => p.id === idNum);

    if (!produto) return;

    if (acao === 'aumentar') {
        produto.quantidade++;
    } else if (acao === 'diminuir' && produto.quantidade > 1) {
        produto.quantidade--;
    } else if (acao === 'diminuir' && produto.quantidade === 1) {
        removerItem(id);
        return; 
    }
    
    salvarCarrinho(); // Salva a alteração no LocalStorage
    renderizarCarrinho(); // Redesenha
}


// 7. Adiciona os 'ouvintes de eventos' (listeners) aos botões
function adicionarEventListeners() {
    document.querySelectorAll('.btn-remover').forEach(button => {
        button.addEventListener('click', (e) => removerItem(e.target.dataset.id));
    });

    document.querySelectorAll('.btn-quantidade').forEach(button => {
        button.addEventListener('click', (e) => {
            alterarQuantidade(e.target.dataset.id, e.target.dataset.acao);
        });
    });

    const comprarBtn = document.querySelector('.btn-comprar');
    if(comprarBtn) {
         comprarBtn.addEventListener('click', () => {
            if (produtosCarrinhoRenderizaveis.length > 0) {
                window.location.href = '../pagamento/pagamento.html';
            } else {
                alert('Seu carrinho está vazio. Adicione produtos antes de comprar.');
            }
        });
    }
}

// **********************************************
// INICIALIZAÇÃO PRINCIPAL
// **********************************************

async function inicializarCarrinho() {
    itensCarrinhoContainer.innerHTML = '<p class="carrinho-vazio">Carregando dados...</p>';
    await buscarProdutosAPI();
    montarCarrinhoParaRenderizacao();
    renderizarCarrinho();
}

document.addEventListener('DOMContentLoaded', inicializarCarrinho);