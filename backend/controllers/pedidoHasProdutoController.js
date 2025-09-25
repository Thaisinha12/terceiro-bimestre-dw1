//import { query } from '../database.js';
const { query } = require('../database');
// Funções do controller

const path = require('path');

exports.abrirCrudPedidoHasProduto = (req, res) => {
  console.log('pedidoHasProduto - Rota /abrirCrudPedidoHasProduto');
  res.sendFile(path.join(__dirname, '../../frontend/pedidoHasProduto/pedidoHasProduto.html'));
}


// exports.listarPedidoHasProduto = async (req, res) => {
//   try {
//     const result = await query('SELECT * FROM questao, pedido_has_questao WHERE pedido_id_pedido=?');
//     // console.log('Resultado do SELECT:', result.rows);//verifica se está retornando algo
//     res.json(result.rows);
//   } catch (error) {
//     console.error('Erro ao listar professor:', error);
//     res.status(500).json({ error: 'Erro interno do servidor' });
//   }
// }

exports.obterPedidoHasProdutoList = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({ error: 'ID deve ser um número válido' });
    }

    const result = await query(
        'SELECT produto.id_produto,produto.nome_produto, produto.quant_estoque FROM produto, pedido_has_produto WHERE pedido_id_pedido=$1 and produto.id_produto = pedido_has_produto.produto_id_produto order by produto.id_produto',      
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Produto não encontrado' });
    }

    res.json(result.rows);
  } catch (error) {
    console.error('Erro ao obter pedido has produto:', error);
    res.status(500).json({ error: 'Erro interno do servidor - pedidoHasProduto' });
  }
}
