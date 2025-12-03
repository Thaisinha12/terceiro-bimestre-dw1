const express = require('express');
const router = express.Router();
const relatorioController = require('../controllers/relatorioController');

// Rota: Abre a tela para o Relatório de Pastéis Mais Vendidos
router.get('/abrir-relatorio-pasteis-vendidos', relatorioController.abrirRelatorioPasteisVendidos);

// Rota: Abre a tela para o Relatório do Mês com Mais Vendas
router.get('/abrir-relatorio-mes-vendas', relatorioController.abrirRelatorioMesVendas);

// Rota: mês com mais pastéis vendidos
router.get('/mes-mais-vendas', relatorioController.mesMaisVendas);

// Rota: pastéis mais vendidos
router.get('/pasteis-mais-vendidos', relatorioController.pasteisMaisVendidos);

router.get('/todos-os-meses', relatorioController.todosOsMeses);

module.exports = router;