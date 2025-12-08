const path = require('path');
const db = require('../database'); // se você usa PostgreSQL

module.exports = {
    abrirTelaCriarConta: (req, res) => {
        res.sendFile(path.join(__dirname, '../frontend/criarConta/criarConta.html'));
    },

    verificarEmail: async (req, res) => {
        const { email } = req.body;

        try {
            const result = await db.query('SELECT * FROM pessoa WHERE email = $1', [email]);

            if (result.rows.length > 0) {
                return res.json({ existe: true });
            }

            return res.json({ existe: false });
        } catch (erro) {
            return res.status(500).json({ error: 'Erro ao verificar email' });
        }
    },

    criarConta: async (req, res) => {
        const { nome, email, senha, confirmarSenha } = req.body;

        // 🔴 VERIFICAÇÃO DE SENHAS
        if (senha !== confirmarSenha) {
            return res.status(400).json({
                erro: "As senhas não coincidem."
            });
        }

        try {

            // Verifica se email já existe
            const existe = await db.query(
                'SELECT * FROM pessoa WHERE email = $1',
                [email]
            );

            if (existe.rows.length > 0) {
                return res.status(400).json({ erro: "Email já cadastrado." });
            }

            // Salva usuário
            await db.query(
                'INSERT INTO pessoa (nome, email, senha) VALUES ($1, $2, $3)',
                [nome, email, senha]
            );

            return res.json({ sucesso: true });

        } catch (erro) {
            return res.status(500).json({ erro: "Erro ao criar conta." });
        }
    }
};
