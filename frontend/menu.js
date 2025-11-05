document.addEventListener('DOMContentLoaded', () => {
    // VARIÁVEIS DO DOM E ESTADO
    const container = document.getElementById('produtos-container');
    const prevButton = document.querySelector('.prev-button');
    const nextButton = document.querySelector('.next-button');
    const urlDaApi = 'http://localhost:3001/produto/'; 
    
    let produtos = []; // Onde os dados buscados serão armazenados
    let currentIndex = 0;
    const cardWidth = 320; 

    // **********************************************
    // FUNÇÕES DE GESTÃO DO CARRINHO (LocalStorage)
    // **********************************************

    function getCarrinho() {
        const carrinhoJson = localStorage.getItem('carrinhoItens');
        return carrinhoJson ? JSON.parse(carrinhoJson) : [];
    }

    function salvarCarrinho(itens) {
        localStorage.setItem('carrinhoItens', JSON.stringify(itens));
    }

    function adicionarAoCarrinho(produto) {
        let carrinho = getCarrinho();
        // Usa o id_produto da API para verificar
        const itemExistente = carrinho.find(item => item.id === produto.id_produto); 

        if (itemExistente) {
            itemExistente.quantidade++;
        } else {
            carrinho.push({
                id: produto.id_produto,
                nome: produto.nome_produto, // Nome do produto para exibição rápida
                precoUnitario: parseFloat(produto.preco_produto), 
                quantidade: 1
            });
        }

        salvarCarrinho(carrinho);
        alert(`${produto.nome_produto} adicionado ao carrinho!`);
    }

    // FUNÇÃO QUE GERA E INJETA O HTML (A RENDERIZAÇÃO)
    function renderizarProdutos() {
        container.innerHTML = ''; 

        if (produtos.length === 0) {
            container.innerHTML = `<p style="margin: 20px; color: red;">Não foi possível carregar os produtos. Verifique se a API está online em ${urlDaApi}</p>`;
            prevButton.style.display = 'none';
            nextButton.style.display = 'none';
            return;
        }

        produtos.forEach(produto => {
            const card = document.createElement('div');
            card.className = 'produto-card';

            const imagemSrc = `imagens/${produto.id_produto}.jpeg`; 

            // Construção do HTML do produto, INCLUINDO O BOTÃO DE ADICIONAR
            card.innerHTML = `
                <img src="${imagemSrc}" alt="Imagem de ${produto.nome_produto}">
                <h3>${produto.nome_produto}</h3>
                <p>Estoque: ${produto.quant_estoque}</p>
                <p class="preco">R$ ${String(produto.preco_produto).replace('.', ',')}</p>
                <button class="btn-adicionar" data-id="${produto.id_produto}">Adicionar ao Carrinho</button>
            `;
            container.appendChild(card);
        });

        // Adiciona o listener para os botões de adicionar
        document.querySelectorAll('.btn-adicionar').forEach(button => {
            button.addEventListener('click', (e) => {
                const idProduto = parseInt(e.target.dataset.id);
                const produtoSelecionado = produtos.find(p => p.id_produto === idProduto);
                if (produtoSelecionado) {
                    adicionarAoCarrinho(produtoSelecionado);
                }
            });
        });

        // Mostra os botões de navegação
        prevButton.style.display = 'block';
        nextButton.style.display = 'block';
        atualizarCarrossel();
    }
    
    // FUNÇÕES DE NAVEGAÇÃO DO CARROSSEL
    function atualizarCarrossel() {
        const deslocamento = -currentIndex * cardWidth;
        container.style.transform = `translateX(${deslocamento}px)`;
    }

    function mover(direcao) {
        if (!produtos.length) return;

        if (direcao === 'proximo') {
            currentIndex = (currentIndex < produtos.length - 1) ? currentIndex + 1 : 0; 
        } else if (direcao === 'anterior') {
            currentIndex = (currentIndex > 0) ? currentIndex - 1 : produtos.length - 1; 
        }
        atualizarCarrossel();
    }

    // FUNÇÃO PRINCIPAL: BUSCAR DADOS DA API
    async function buscarErenderizarProdutos() {
        try {
            const response = await fetch(urlDaApi);
            if (!response.ok) {
                throw new Error(`Erro HTTP: Status ${response.status}`);
            }
            produtos = await response.json(); 
            
        } catch (error) {
            console.error("Erro fatal ao buscar dados da API. Verifique a rota:", error);
            produtos = []; 
        }

        renderizarProdutos(); 
    }

    // INICIALIZAÇÃO E LISTENERS
    buscarErenderizarProdutos();

    prevButton.addEventListener('click', () => mover('anterior'));
    nextButton.addEventListener('click', () => mover('proximo'));
});