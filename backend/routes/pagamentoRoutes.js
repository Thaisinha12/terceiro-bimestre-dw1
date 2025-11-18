const express = require('express');
const router = express.Router();
const pagamentoController = require('./../controllers/pagamentoController');

// CRUD de Pedido

//router.get('/abrirCrudPedido', pedidoController.abrirCrudPedido);
router.get('/', pagamentoController.listarPagamentos);
router.post('/', pedidoController.criarPagamento);
router.get('/:id', pedidoController.obterPagamento);
router.put('/:id', pedidoController.atualizarPagamento);
router.delete('/:id', pedidoController.deletarPagamento);

module.exports = router;