const express = require('express');
const router = express.Router();
const menuGerenteController = require('../controllers/menuGerenteController');

// Rotas de autenticação

router.get('/', menuGerenteController.abrirMenuGerente);
// router.post('/inicio', menuController.inicio);
router.post('/logout', menuGerenteController.logout);

module.exports = router;
