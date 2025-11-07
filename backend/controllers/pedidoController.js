//import { query } from '../database.js';
const { query } = require('../database');
// Funções do controller

const path = require('path');

exports.abrirCrudPedido = (req, res) => {
  console.log('pedidoController - Rota /abrirCrudPedido - abrir o crudPedido');
  res.sendFile(path.join(__dirname, '../../frontend/pedido/pedido.html'));
}

exports.listarPedidos = async (req, res) => {
  try {
    const result = await query('SELECT * FROM pedido ORDER BY id_pedido');
    // console.log('Resultado do SELECT:', result.rows);//verifica se está retornando algo
    res.json(result.rows);
  } catch (error) {
    console.error('Erro ao listar pedidos:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
}

exports.criarPedido = async (req, res) => {
  //  console.log('Criando pedido com dados:', req.body);
  try {
    const { id_pedido, data_pedido, cpf_cliente} = req.body;

    // Validação básica
    if (!data_pedido) {
      return res.status(400).json({
        error: 'A data do pedido é obrigatório.'
      });
    }

    const result = await query(
      'INSERT INTO pedido (id_pedido, data_pedido, cpf_cliente) VALUES ($1, $2, $3) RETURNING *',
      [id_pedido, data_pedido, cpf_cliente]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Erro ao criar pedido:', error);


    // Verifica se é erro de violação de constraint NOT NULL
    if (error.code === '23502') {
      return res.status(400).json({
        error: 'Dados obrigatórios não fornecidos'
      });
    }

    res.status(500).json({ error: 'Erro interno do servidor' });
  }
}

exports.obterPedido = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({ error: 'ID deve ser um número válido' });
    }

    const result = await query(
      'SELECT * FROM pedido WHERE id_pedido = $1',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Pedido não encontrado' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Erro ao obter pedido:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
}

exports.atualizarPedido = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { data_pedido } = req.body;
    const { cpf_cliente } = req.body;
   
    // Verifica se o pedido existe
    const existingPersonResult = await query(
      'SELECT * FROM pedido WHERE id_pedido = $1',
      [id]
    );

    if (existingPersonResult.rows.length === 0) {
      return res.status(404).json({ error: 'Pedido não encontrado' });
    }

    // Constrói a query de atualização dinamicamente para campos não nulos
    const currentPerson = existingPersonResult.rows[0];
    const updatedFields = {
  data_pedido: data_pedido !== undefined ? data_pedido : currentPerson.data_pedido,
  cpf_cliente: cpf_cliente !== undefined ? cpf_cliente : currentPerson.cpf_cliente
};


    // Atualiza o pedido
    const updateResult = await query(
  'UPDATE pedido SET data_pedido = $1, cpf_cliente = $2 WHERE id_pedido = $3 RETURNING *',
  [updatedFields.data_pedido, updatedFields.cpf_cliente, id]
);

    res.json(updateResult.rows[0]);
  } catch (error) {
    console.error('Erro ao atualizar pedido:', error);


    res.status(500).json({ error: 'Erro interno do servidor' });
  }
}

exports.deletarPedido = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    // Verifica se o pedido existe
    const existingPersonResult = await query(
      'SELECT * FROM pedido WHERE id_pedido = $1',
      [id]
    );

    if (existingPersonResult.rows.length === 0) {
      return res.status(404).json({ error: 'Pedido não encontrado' });
    }

    // Deleta o pedido (as constraints CASCADE cuidarão das dependências)
    await query(
      'DELETE FROM pedido WHERE id_pedido = $1',
      [id]
    );

    res.status(204).send();
  } catch (error) {
    console.error('Erro ao deletar pedido:', error);

    // Verifica se é erro de violação de foreign key (dependências)
    if (error.code === '23503') {
      return res.status(400).json({
        error: 'Não é possível deletar pedido com dependências associadas'
      });
    }

    res.status(500).json({ error: 'Erro interno do servidor' });
  }
}