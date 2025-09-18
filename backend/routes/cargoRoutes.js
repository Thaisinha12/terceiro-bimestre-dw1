const express = require('express');
const router = express.Router();
const cargoController = require('./../controllers/cargoController');

// CRUD de Questaos

router.get('/abrirCrudCargo', cargoController.abrirCrudCargo);
router.get('/', questaoController.listarQuestoes);
router.post('/', questaoController.criarQuestao);
router.get('/:id', questaoController.obterQuestao);
router.put('/:id', questaoController.atualizarQuestao);
router.delete('/:id', questaoController.deletarQuestao);

module.exports = router;
