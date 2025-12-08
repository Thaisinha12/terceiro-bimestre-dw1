const express = require('express');
const router = express.Router();
const criarContaController = require('../controllers/criarContaController');

// Abre a tela de criar conta (criarConta.html)
router.get('/', criarContaController.abrirTelaCriarConta);

// Recebe o formulário da tela (nome, email, senha, confirmarSenha)
router.post('/criar', criarContaController.criarConta);

// Verifica se o e-mail já existe (caso você use no frontend)
router.post('/verificarEmail', criarContaController.verificarEmail);

module.exports = router;
