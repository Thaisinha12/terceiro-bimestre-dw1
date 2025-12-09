const { query } = require('../database');

exports.criar = async (req, res) => {
  console.log("Chegou no criar")
  try {
    const { nome, email, senha, cpf, endereco } = req.body;

    console.log(req.body)

    if (!nome || !email || !senha || !cpf || !endereco) {
      return res.status(400).json({ erro: "Nome, email, senha, CPF e endereço são obrigatórios" });
    }
console.log("antes chegou aqui")
    // Verifica duplicados
    const check = await query("SELECT id_pessoa FROM pessoa WHERE email_pessoa = $1 OR cpf_pessoa = $2",
      [email, cpf]
    );

    console.log("chegou aqui")

    if (check.rows.length > 0) {
      return res.status(400).json({ erro: "Email ou CPF já estão em uso" });
    }

    // Cria pessoa
    const result = await query(
      `INSERT INTO pessoa (cpf_pessoa, nome_pessoa, email_pessoa, senha_pessoa)
       VALUES ($1, $2, $3, $4)
       RETURNING id_pessoa, nome_pessoa, email_pessoa, cpf_pessoa`,
      [cpf, nome, email, senha]
    );

    const pessoa = result.rows[0];

    console.log(pessoa)

    // Cria cliente com endereço vinculado
    await query(
      `INSERT INTO cliente (id_pessoa, endereco_cliente)
       VALUES ($1, $2)`,
      [pessoa.id_pessoa, endereco]
    );

    // Grava cookie igual ao login
    res.cookie("usuarioLogado", JSON.stringify(pessoa), {
      httpOnly: false, // precisa ser false porque o front lê o cookie
      maxAge: 3600 * 1000, // 1h
      path: "/"
    });

    // Retorna também no body
    res.status(201).json({
      sucesso: true,
      usuario: pessoa
    });

  } catch (err) {
    console.error("Erro no cadastro:", err);
    res.status(500).json({ erro: "Erro interno ao cadastrar" });
  }
};
