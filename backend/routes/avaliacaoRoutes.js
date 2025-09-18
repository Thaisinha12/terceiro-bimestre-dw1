const express = require('express');
const router = express.Router();
const gerenteController = require('./../controllers/gerenteController');

// CRUD de Gerentes

router.get('/abrirCrudGerente', gerenteController.abrirCrudGerente);
router.get('/', avaliacaoController.listarAvaliacoes);
router.post('/', avaliacaoController.criarAvaliacao);
router.get('/:id', avaliacaoController.obterAvaliacao);
router.put('/:id', avaliacaoController.atualizarAvaliacao);
router.delete('/:id', avaliacaoController.deletarAvaliacao);

module.exports = router;
