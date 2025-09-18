//import { query } from '../database.js';
const { query } = require('../database');
// Funções do controller

const path = require('path');

exports.abrirCrudCargo = (req, res) => {
  console.log('cargoController - Rota /abrirCrudCargo - abrir o crudCargo');
  res.sendFile(path.join(__dirname, '../../frontend/cargo/cargo.html'));
}

exports.listarCargos = async (req, res) => {
  try {
    const result = await query('SELECT * FROM cargo ORDER BY id_cargo');
    // console.log('Resultado do SELECT:', result.rows);//verifica se está retornando algo
    res.json(result.rows);
  } catch (error) {
    console.error('Erro ao listar cargos:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
}

// exports.listarQuestoes = async (req, res) => {
//   try {
//     const result = await query('SELECT * FROM questao ORDER BY id_questao');
//     // console.log('Resultado do SELECT:', result.rows);//verifica se está retornando algo
//     res.json(result.rows);
//   } catch (error) {
//     console.error('Erro ao listar questoes:', error);
//     res.status(500).json({ error: 'Erro interno do servidor' });
//   }
// }

exports.criarCargo = async (req, res) => {
  //  console.log('Criando questao com dados:', req.body);
  try {
    const { id_cargo, nomeCargo} = req.body;

    // Validação básica
    if (!nomeCargo) {
      return res.status(400).json({
        error: 'O nome do cargo é obrigatório.'
      });
    }

    const result = await query(
      'INSERT INTO cargo (id_cargo, nomeCargo) VALUES ($1, $2) RETURNING *',
      [id_cargo, nomeCargo]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Erro ao criar cargo:', error);

    // Verifica se é erro de email duplicado (constraint unique violation)
    if (error.code === '23505' && error.constraint === 'questao_nota_maxima_questao_key') {
      return res.status(400).json({
        error: 'Email já está em uso'
      });
    }

    // Verifica se é erro de violação de constraint NOT NULL
    if (error.code === '23502') {
      return res.status(400).json({
        error: 'Dados obrigatórios não fornecidos'
      });
    }

    res.status(500).json({ error: 'Erro interno do servidor' });
  }
}

exports.obterCargo = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({ error: 'ID deve ser um número válido' });
    }

    const result = await query(
      'SELECT * FROM cargo WHERE id_cargo = $1',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Cargo não encontrado' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Erro ao obter cargo:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
}

exports.atualizarCargo = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { nomeCargo } = req.body;

   
    // Verifica se a questao existe
    const existingPersonResult = await query(
      'SELECT * FROM cargo WHERE id_cargo = $1',
      [id]
    );

    if (existingPersonResult.rows.length === 0) {
      return res.status(404).json({ error: 'Cargo não encontrado' });
    }

    // Constrói a query de atualização dinamicamente para campos não nulos
    const currentPerson = existingPersonResult.rows[0];
    const updatedFields = {
      nomeCargo: nomeCargo !== undefined ? nomeCargo : currentPerson.nomeCargo     
    };

    // Atualiza a questao
    const updateResult = await query(
      'UPDATE cargo SET nomeCargo = $1, WHERE id_cargo = $2 RETURNING *',
      [updatedFields.nomeCargo, id]
    );

    res.json(updateResult.rows[0]);
  } catch (error) {
    console.error('Erro ao atualizar cargo:', error);

    // Verifica se é erro de email duplicado
    if (error.code === '23505' && error.constraint === 'questao_nota_maxima_questao_key') {
      return res.status(400).json({
        error: 'Email já está em uso por outra questao'
      });
    }

    res.status(500).json({ error: 'Erro interno do servidor' });
  }
}

exports.deletarCargo = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    // Verifica se o cargo existe
    const existingPersonResult = await query(
      'SELECT * FROM cargo WHERE id_cargo = $1',
      [id]
    );

    if (existingPersonResult.rows.length === 0) {
      return res.status(404).json({ error: 'Cargo não encontrado' });
    }

    // Deleta o cargo (as constraints CASCADE cuidarão das dependências)
    await query(
      'DELETE FROM cargo WHERE id_cargo = $1',
      [id]
    );

    res.status(204).send();
  } catch (error) {
    console.error('Erro ao deletar cargo:', error);

    // Verifica se é erro de violação de foreign key (dependências)
    if (error.code === '23503') {
      return res.status(400).json({
        error: 'Não é possível deletar cargo com dependências associadas'
      });
    }

    res.status(500).json({ error: 'Erro interno do servidor' });
  }
}

// Função adicional para buscar questao por email
exports.obterQuestaoPorEmail = async (req, res) => {
  try {
    const { email } = req.params;

    if (!email) {
      return res.status(400).json({ error: 'Email é obrigatório' });
    }

    const result = await query(
      'SELECT * FROM questao WHERE nota_maxima_questao = $1',
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Cargo não encontrado' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Erro ao obter questao por email:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
}

