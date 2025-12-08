// menuGerenteController.js
const path = require('path');

exports.abrirMenuGerente = (req, res) => {
  const usuario = req.cookies.usuarioLogado;

  if (usuario) {
    res.sendFile(path.join(__dirname, "../../frontend/menuGerente.html"));
  } else {
    res.redirect("/login/");
  }
};



exports.logout = (req, res) => {
    // Implementação da rota logout
    res.send('Rota logout');
};