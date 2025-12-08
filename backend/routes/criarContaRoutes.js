const express = require('express');
const router = express.Router();
const criarContaController = require('../controllers/criarContaController');

router.post('/cadastrar', criarContaController.cadastrar);

module.exports = router;
