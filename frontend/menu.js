document.addEventListener('DOMContentLoaded', () => {
    
    const CATEGORIAS_API = 'http://localhost:3001/categoria/';
    const PRODUTOS_API = 'http://localhost:3001/produto/';

    // --- MOSTRAR NOME DO USUÁRIO SE ELE ESTIVER LOGADO ---
    const nomeSalvo = localStorage.getItem("nomeUsuario");
    if (nomeSalvo) {
        exibirNomeNoMenu(nomeSalvo);
    }
    
    const containerPrincipal = document.getElementById('categorias-container');
    const loadingMessage = document.getElementById('loading-message');
    const cardWidth = 335; // Largura do card (300px) + margem (35px)
    let carrosseis = {}; // Armazena o estado (currentIndex) de cada carrossel

    let categoriasGlobais = [];
    let produtosGlobais = [];

    

    /**
     * Auxiliar para agrupar produtos pela chave id_categoria.
     */
    function agruparProdutos(produtos) {
        return produtos.reduce((acc, produto) => {
            const id = produto.id_categoria;
            if (!acc[id]) {
                acc[id] = [];
            }
            acc[id].push(produto);
            return acc;
        }, {});
    }

  function adicionarAoCarrinho(idProduto) {
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

    // Acha o produto completo no array produtosGlobais
    const produto = produtosGlobais.find(p => p.id_produto == idProduto);
    if (!produto) {
        alert("Erro: produto não encontrado.");
        return;
    }

    // Verifica se já existe no carrinho
    const itemExistente = carrinho.find(item => item.id == idProduto);

    if (itemExistente) {
        itemExistente.quantidade += 1;
    } else {
        carrinho.push({
            id: produto.id_produto,
            nome: produto.nome_produto,
            preco: parseFloat(produto.preco_produto), 
            quantidade: 1
        });
    }

    localStorage.setItem('carrinho', JSON.stringify(carrinho));

    alert("✅ Produto adicionado ao carrinho!");
}


    function renderizarCarrossel(categoria, produtosDaCategoria) {
        // Não renderiza categorias sem produtos para manter o layout limpo
        if (produtosDaCategoria.length === 0) return; 

        const idCategoria = categoria.id_categoria;
        
        // Cria a seção completa para a categoria (título + carrossel)
        const section = document.createElement('section');
        section.className = 'categoria-section';
        section.id = `categoria-${idCategoria}`;

        section.innerHTML = `
            <h2 class="categoria-title">${categoria.nome_categoria}</h2>
            <div class="carousel-container">
                <button class="nav-button prev-button" data-id="${idCategoria}" aria-label="Anterior">&#10094;</button>
                <div class="carousel-track" id="track-${idCategoria}">
                    <!-- Cards serão inseridos aqui -->
                </div>
                <button class="nav-button next-button" data-id="${idCategoria}" aria-label="Próximo">&#10095;</button>
            </div>
        `;

        containerPrincipal.appendChild(section);
        const track = document.getElementById(`track-${idCategoria}`);

        // 1. Renderiza os Cards
        produtosDaCategoria.forEach(produto => {
            const card = document.createElement('div');
            card.className = 'produto-card';
            const imagemSrc = `imagens/${produto.id_produto}.jpeg`; 

            card.innerHTML = `
                <img src="${imagemSrc}" alt="Imagem de ${produto.nome_produto}" onerror="this.onerror=null; this.src='https://placehold.co/300x200/cccccc/333333?text=Sem+Imagem'">
                <h3>${produto.nome_produto}</h3>
                <p>Estoque: ${produto.quant_estoque}</p>
                <p class="preco">R$ ${produto.preco_produto.replace('.', ',')}</p>
                <button class="btn-adicionar" data-produto-id="${produto.id_produto}">Adicionar ao Carrinho</button>
            `;
            track.appendChild(card);
        });

        // 2. Inicializa o estado do carrossel
        carrosseis[idCategoria] = {
            currentIndex: 0,
            trackElement: track,
            produtoCount: produtosDaCategoria.length
        };
    }

    /**
     * Move o carrossel específico.
     */
    function moverCarrossel(id, direcao) {
        const estado = carrosseis[id];
        if (!estado || estado.produtoCount <= 1) return;

        let newIndex = estado.currentIndex;

        if (direcao === 'proximo') {
            newIndex = (newIndex < estado.produtoCount - 1) ? newIndex + 1 : 0;
        } else if (direcao === 'anterior') {
            newIndex = (newIndex > 0) ? newIndex - 1 : estado.produtoCount - 1;
        }
        
        estado.currentIndex = newIndex;
        
        const deslocamento = -newIndex * cardWidth;
        estado.trackElement.style.transform = `translateX(${deslocamento}px)`;
    }

    /**
     * Função principal: Busca ambas as rotas e inicia a renderização.
     */
    async function inicializarCardapio() {
        if (loadingMessage) loadingMessage.remove(); 
        
        try {
            // Busca as duas rotas em paralelo
            const [categoriasRes, produtosRes] = await Promise.all([
                fetch(CATEGORIAS_API),
                fetch(PRODUTOS_API)
            ]);
            
            // Verifica se a resposta foi bem sucedida
            if (!categoriasRes.ok || !produtosRes.ok) {
                 throw new Error(`Erro ao carregar rotas. Status: Categorias=${categoriasRes.status}, Produtos=${produtosRes.status}`);
            }

            const categorias = await categoriasRes.json();
            const produtos = await produtosRes.json();

            if (!categorias.length) {
                containerPrincipal.innerHTML = '<p style="margin: 50px; color: red; font-size: 1.3em;">Nenhuma categoria retornada da rota.</p>';
                return;
            }

            // Agrupa e Renderiza
            const produtosAgrupados = agruparProdutos(produtos);

            categorias.forEach(categoria => {
                const produtosDoGrupo = produtosAgrupados[categoria.id_categoria] || [];
                renderizarCarrossel(categoria, produtosDoGrupo);
            });
            
            // Adiciona um único listener para tratar todos os cliques (navegação e adicionar)
            containerPrincipal.addEventListener('click', (event) => {
                // 1. Navegação de Carrossel
                const navButton = event.target.closest('.nav-button');
                if (navButton) {
                    const id = parseInt(navButton.dataset.id);
                    const direcao = navButton.classList.contains('next-button') ? 'proximo' : 'anterior';
                    moverCarrossel(id, direcao);
                    return;
                }

                // 2. Adicionar ao Carrinho
                const addButton = event.target.closest('.btn-adicionar');
                if (addButton) {
                    const idProduto = addButton.dataset.produtoId;
                    adicionarAoCarrinho(idProduto);
                }
            });

            categoriasGlobais = categorias;
            produtosGlobais = produtos;
            configurarPesquisa();
function configurarPesquisa() {
  const campoPesquisa = document.getElementById('campo-pesquisa');
  if (!campoPesquisa) return;

  campoPesquisa.addEventListener('input', (event) => {
    const termoBruto = event.target.value.trim().toLowerCase();
    const termoNormalizado = removerAcentos(termoBruto);

    if (termoNormalizado === '') {
      // Volta o cardápio completo
      containerPrincipal.innerHTML = '';
      categoriasGlobais.forEach(categoria => {
        const produtosDoGrupo = produtosGlobais.filter(p => p.id_categoria === categoria.id_categoria);
        renderizarCarrossel(categoria, produtosDoGrupo);
      });
      return;
    }

    // Divide a busca em várias palavras
    const termos = termoNormalizado.split(/\s+/).filter(t => t.length > 0);

    // Filtra produtos se todas as palavras aparecerem parcialmente no nome
    const produtosFiltrados = produtosGlobais.filter(produto => {
      const nomeNormalizado = removerAcentos(produto.nome_produto.toLowerCase());
      return termos.every(termo => nomeNormalizado.includes(termo));
    });

    // Agrupa os filtrados por categoria
    const agrupados = agruparProdutos(produtosFiltrados);

    // Renderiza só os resultados filtrados
    containerPrincipal.innerHTML = '';
    categoriasGlobais.forEach(cat => {
      const grupo = agrupados[cat.id_categoria] || [];
      renderizarCarrossel(cat, grupo);
    });
  });
}

// Remove acentos e normaliza para comparação
function removerAcentos(texto) {
  return texto.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

function removerAcentos(texto) {
  return texto.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}


        } catch (error) {
            console.error("Erro fatal na busca das rotas:", error);
            // Mensagem de erro amigável na tela
            containerPrincipal.innerHTML = `
                <div style="margin: 50px; padding: 30px; border: 2px solid rgb(203, 0, 0); background-color: #FFF3CD; border-radius: 10px; color: rgb(203, 0, 0);">
                    <h2 style="color: #FF0000;">⚠️ ERRO DE CONEXÃO COM AS ROTAS ⚠️</h2>
                    <p style="margin-top: 15px;">Não foi possível carregar os dados de http://localhost:3001/. Verifique se o seu servidor Node está ativo e se a configuração de CORS está correta.</p>
                    <p>Detalhe do Erro: ${error.message}</p>
                </div>
            `;
        }
    }

    // INICIA A RENDERIZAÇÃO
    inicializarCardapio();
});

//Chat mandou colocar, se der errado é só apagar tudo daqui pra baixo:
// --- CONTROLE DO USUÁRIO (login / logout) ---
async function handleUserAction(action) {
    const select = document.getElementById("oUsuario");

    if (action === "") {
        //O usuário clicou em "Usuário" → ir para login
        window.location.href = "/frontend/login/login.html";
        return;
    }

    if (action === "sair") {
        try {
            const resp = await fetch('http://localhost:3001/login/logout', {
                method: 'GET',
                credentials: 'include'  // IMPORTANTÍSSIMO para enviar o cookie httpOnly
            });

            const data = await resp.json();
            console.log("Logout ->", data);

            //Limpa o carrinho para o próximo usuário
            localStorage.removeItem("carrinho");

            alert("Você saiu da sua conta!");

        } catch (error) {
            console.error("Erro ao fazer logout:", error);
        }
    }
}

//Daqui pra baixo é pra trocar "Usuário" pelo nome do usuário
function exibirNomeNoMenu(nome) {
    const select = document.getElementById("oUsuario");

    // Remove opções atuais
    select.innerHTML = "";

    // Cria nova opção com o nome do usuário
    const optUsuario = document.createElement("option");
    optUsuario.value = "";
    optUsuario.textContent = nome;
    select.appendChild(optUsuario);

    // Opção "Sair"
    const optSair = document.createElement("option");
    optSair.value = "sair";
    optSair.textContent = "Sair";
    select.appendChild(optSair);
}


//Daqui pra baixo é pra ver o nome no usuário
function exibirNomeNoMenu(nome) {
    const select = document.getElementById("oUsuario");

    // Remove opções atuais
    select.innerHTML = "";

    // Cria nova opção com o nome do usuário
    const optUsuario = document.createElement("option");
    optUsuario.value = "";
    optUsuario.textContent = nome;
    select.appendChild(optUsuario);

    // Opção "Sair"
    const optSair = document.createElement("option");
    optSair.value = "sair";
    optSair.textContent = "Sair";
    select.appendChild(optSair);
}



