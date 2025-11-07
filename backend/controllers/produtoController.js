//import { query } from '../database.js';
const { query } = require('../database');
// Funções do controller

const path = require('path');

exports.abrirCrudProduto = (req, res) => {
  console.log('produtoController - Rota /abrirCrudProduto - abrir o crudProduto');
  res.sendFile(path.join(__dirname, '../../frontend/produto/produto.html'));
}

exports.listarProdutos = async (req, res) => {
  try {
    const result = await query('SELECT * FROM produto ORDER BY id_produto');
    // console.log('Resultado do SELECT:', result.rows);//verifica se está retornando algo
    res.json(result.rows);
  } catch (error) {
    console.error('Erro ao listar produtos:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
}

exports.criarProduto = async (req, res) => {
  //  console.log('Criando produto com dados:', req.body);
  try {
    const { id_produto, nome_produto, quant_estoque, preco_produto, id_categoria} = req.body;

    // Validação básica
    if (!nome_produto) {
      return res.status(400).json({
        error: 'O nome do produto é obrigatório.'
      });
    }

    const result = await query(
      'INSERT INTO produto (id_produto, nome_produto, quant_estoque, preco_produto, id_categoria) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [id_produto, nome_produto, quant_estoque, preco_produto, id_categoria]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Erro ao criar produto:', error);


    // Verifica se é erro de violação de constraint NOT NULL
    if (error.code === '23502') {
      return res.status(400).json({
        error: 'Dados obrigatórios não fornecidos'
      });
    }

    res.status(500).json({ error: 'Erro interno do servidor' });
  }
}

exports.obterProduto = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({ error: 'ID deve ser um número válido' });
    }

    const result = await query(
      'SELECT * FROM produto WHERE id_produto = $1',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Produto não encontrado' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Erro ao obter produto:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
}

exports.atualizarProduto = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { nome_produto, quant_estoque, preco_produto, id_categoria } = req.body;

    // Verifica se o produto existe
    const existingPersonResult = await query(
      'SELECT * FROM produto WHERE id_produto = $1',
      [id]
    );

    if (existingPersonResult.rows.length === 0) {
      return res.status(404).json({ error: 'Produto não encontrado' });
    }

    // Constrói a query de atualização dinamicamente para campos não nulos
    const currentPerson = existingPersonResult.rows[0];
    const updatedFields = {
      nome_produto: nome_produto !== undefined ? nome_produto : currentPerson.nome_produto,
      quant_estoque: quant_estoque !== undefined ? quant_estoque : currentPerson.quant_estoque,
      preco_produto: preco_produto !== undefined ? preco_produto : currentPerson.preco_produto,
      id_categoria: id_categoria !== undefined ? id_categoria : currentPerson.id_categoria
    };

    // Atualiza o produto
   const updateResult = await query(
  `UPDATE produto SET 
      nome_produto = $1,
      quant_estoque = $2,
      preco_produto = $3,
      id_categoria = $4
   WHERE id_produto = $5 RETURNING *`,
  [
    updatedFields.nome_produto,
    updatedFields.quant_estoque,
    updatedFields.preco_produto,
    updatedFields.id_categoria,
    id
  ]
);

    res.json(updateResult.rows[0]);
  } catch (error) {
    console.error('Erro ao atualizar produto:', error);


    res.status(500).json({ error: 'Erro interno do servidor' });
  }
}

exports.deletarProduto = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    // Verifica se o produto existe
    const existingPersonResult = await query(
      'SELECT * FROM produto WHERE id_produto = $1',
      [id]
    );

    if (existingPersonResult.rows.length === 0) {
      return res.status(404).json({ error: 'Produto não encontrado' });
    }

    // Deleta o produto (as constraints CASCADE cuidarão das dependências)
    await query(
      'DELETE FROM produto WHERE id_produto = $1',
      [id]
    );

    res.status(204).send();
  } catch (error) {
    console.error('Erro ao deletar produto:', error);

    // Verifica se é erro de violação de foreign key (dependências)
    if (error.code === '23503') {
      return res.status(400).json({
        error: 'Não é possível deletar produto com dependências associadas'
      });
    }

    res.status(500).json({ error: 'Erro interno do servidor' });
  }
}

//ISSO DAQUI PRA BAIXO A IA QUE FEZ:
exports.deletarProduto = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    // Verifica se o produto existe
    const existingProduct = await query(
      'SELECT * FROM produto WHERE id_produto = $1',
      [id]
    );

    if (existingProduct.rows.length === 0) {
      return res.status(404).json({ error: 'Produto não encontrado' });
    }

    // Remove o produto do carrinho (se existir lá)
    await query(
      'DELETE FROM carrinho WHERE id_produto = $1',
      [id]
    );

    // Agora deleta o produto da tabela produto
    await query(
      'DELETE FROM produto WHERE id_produto = $1',
      [id]
    );

    res.status(204).send(); // sucesso, sem conteúdo
  } catch (error) {
    console.error('Erro ao deletar produto:', error);

    // Erro de constraint (caso tenha mais vínculos além de carrinho)
    if (error.code === '23503') {
      return res.status(400).json({
        error: 'Não é possível deletar o produto, pois ele está associado a outros registros.'
      });
    }

    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};
