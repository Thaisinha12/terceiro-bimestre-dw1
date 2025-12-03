const db = require('../database');
const path = require('path');

// Abrir relatório: Pastéis mais vendidos
exports.abrirRelatorioPasteisVendidos = (req, res) => {
  res.sendFile(
    path.join(__dirname, '..', '..', 'frontend', 'relatorio', 'relatorio_pastel.html')
  );
};

// Abrir relatório: mês com mais vendas
exports.abrirRelatorioMesVendas = (req, res) => {
  res.sendFile(
    path.join(__dirname, '..', '..', 'frontend', 'relatorio', 'relatorio_mes.html')
  );
};

// ----------------------
// MÊS COM MAIS VENDAS
// ----------------------
exports.mesMaisVendas = async (req, res) => {
  try {
    const query = `
      SELECT 
        TO_CHAR(DATE_TRUNC('month', data_pedido), 'TMMonth') AS mes,
        COUNT(*) AS total
      FROM pedido
      WHERE data_pedido IS NOT NULL
      GROUP BY DATE_TRUNC('month', data_pedido)
      ORDER BY total DESC
      LIMIT 1;
    `;

    const result = await db.pool.query(query);

    if (result.rows.length === 0) {
      return res.json({ mes: 'Nenhum pedido encontrado', total: 0 });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Erro ao buscar mês com mais vendas:', error);
    res.status(500).json({ error: 'Erro ao gerar relatório de mês mais vendido' });
  }
};

// ----------------------
// PASTÉIS MAIS VENDIDOS
// ----------------------
exports.pasteisMaisVendidos = async (req, res) => {
  try {
    const query = `
  SELECT 
    p.nome_produto AS nome,
    SUM(pp.quantidade) AS quantidade
  FROM pedido_has_produto pp
  JOIN produto p ON p.id_produto = pp.produto_id_produto
  WHERE p.id_categoria IN (1, 2)   -- ← aqui filtramos só os pastéis
  GROUP BY p.nome_produto
  ORDER BY quantidade DESC
  LIMIT 10;
`;


    const result = await db.pool.query(query);
    res.json(result.rows);
  } catch (error) {
    console.error('Erro ao buscar pasteis mais vendidos:', error);
    res.status(500).json({ error: 'Erro ao gerar relatório de pasteis mais vendidas' });
  }
};

// ----------------------
// TODOS OS MESES (para gráfico)
// ----------------------
exports.todosOsMeses = async (req, res) => {
  try {
    const query = `
      SELECT 
        TO_CHAR(DATE_TRUNC('month', data_pedido), 'TMMonth') AS mes,
        COUNT(*) AS total
      FROM pedido
      WHERE data_pedido IS NOT NULL
      GROUP BY DATE_TRUNC('month', data_pedido)
      ORDER BY DATE_PART('month', MIN(data_pedido));
    `;

    const result = await db.pool.query(query);
    res.json(result.rows);
  } catch (error) {
    console.error('Erro ao buscar todos os meses:', error);
    res.status(500).json({ error: 'Erro ao listar meses' });
  }
};