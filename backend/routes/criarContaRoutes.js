const express = require('express');
const router = express.Router();
const criarContaController = require('../controllers/criarContaController');

router.post('/', criarContaController.criar);

module.exports = router;
