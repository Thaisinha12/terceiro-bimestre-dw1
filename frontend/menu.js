document.addEventListener('DOMContentLoaded', () => {
    // VARIÁVEIS DO DOM E ESTADO
    const container = document.getElementById('produtos-container');
    const prevButton = document.querySelector('.prev-button');
    const nextButton = document.querySelector('.next-button');
    const urlDaApi = 'http://localhost:3001/produto/'; // Sua rota
    
    let produtos = []; // Onde os dados buscados serão armazenados
    let currentIndex = 0;
    const cardWidth = 320; 

    // FUNÇÃO QUE GERA E INJETA O HTML (A RENDERIZAÇÃO)
    function renderizarProdutos() {
        // Limpa a mensagem de carregamento
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

            // Caminho da imagem: imagens/id_produto.jpeg
            const imagemSrc = `imagens/${produto.id_produto}.jpeg`; 

            // Construção do HTML do produto
            card.innerHTML = `
                <img src="${imagemSrc}" alt="Imagem de ${produto.nome_produto}">
                <h3>${produto.nome_produto}</h3>
                <p>Estoque: ${produto.quant_estoque}</p>
                <p class="preco">R$ ${produto.preco_produto.replace('.', ',')}</p>
            `;
            container.appendChild(card);
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
                // Lança um erro se a resposta HTTP não for bem-sucedida (ex: 404, 500)
                throw new Error(`Erro HTTP: Status ${response.status}`);
            }
            // Armazena os dados do JSON na variável 'produtos'
            produtos = await response.json(); 
            
        } catch (error) {
            console.error("Erro fatal ao buscar dados da API. Verifique a rota:", error);
            // Deixa 'produtos' como array vazio para renderizar a mensagem de erro
            produtos = []; 
        }

        // Chama a renderização com os dados obtidos ou com a mensagem de erro.
        renderizarProdutos(); 
    }

    // INICIALIZAÇÃO
    buscarErenderizarProdutos();

    // LISTENERS
    prevButton.addEventListener('click', () => mover('anterior'));
    nextButton.addEventListener('click', () => mover('proximo'));
});