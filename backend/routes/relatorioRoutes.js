const express = require('express');
const router = express.Router();
const relatorioController = require('../controllers/relatorioController');

// Rota: mês com mais pasteis vendidos
router.get('/mes-mais-vendas', relatorioController.mesMaisVendas);

// Rota: pasteis mais vendidos
router.get('/pasteis-mais-vendidas', relatorioController.pasteisMaisVendidas);

router.get('/todos-os-meses', relatorioController.todosOsMeses);

module.exports = router;