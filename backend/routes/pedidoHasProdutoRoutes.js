const express = require('express');
const router = express.Router();
const pedidoHasProdutoController = require('./../controllers/pedidoHasProdutoController');

// CRUD de Avaliacaos

router.get('/abrirCrudPedidoHasProduto', pedidoHasProdutoController.abrirCrudPedidoHasProduto);
// router.get('/', pedidoHasProdutoController.listarPedidoHasProduto);
//  router.post('/', pedidoHasProdutoController.criarAvaliacao);
router.get('/:id', pedidoHasProdutoController.obterPedidoHasProdutoList);
//  router.put('/:id', pedidoHasProdutoController.atualizarAvaliacao);
//  router.delete('/:id', pedidoHasProdutoController.deletarAvaliacao);

module.exports = router;
