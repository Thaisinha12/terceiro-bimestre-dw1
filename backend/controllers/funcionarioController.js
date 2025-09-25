//import { query } from '../database.js';
const { query } = require('../database');
// Funções do controller

const path = require('path');

exports.abrirCrudFuncionario = (req, res) => {
//  console.log('funcionarioController - Rota /abrirCrudFuncionario - abrir o crudFuncionario');
  res.sendFile(path.join(__dirname, '../../frontend/funcionario/funcionario.html'));
} //

exports.listarFuncionarios = async (req, res) => {
  try {
    const result = await query('SELECT * FROM funcionario ORDER BY id_funcionario');
    // console.log('Resultado do SELECT:', result.rows);//verifica se está retornando algo
    res.json(result.rows);
  } catch (error) {
    console.error('Erro ao listar funcionarios:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
}

exports.criarFuncionario = async (req, res) => {
    console.log('Criando funcionario com dados:', req.body);
  try {
    const { cpf_funcionario, cargo_funcionario, salario_funcionario} = req.body;



    // Validação básica
    if (!cargo_funcionario || !salario_funcionario) {
      return res.status(400).json({
        error: 'Texto, nota máxima e texto complementar são obrigatórios'
      });
    }

    const result = await query(
      'INSERT INTO funcionario (cpf_funcionario, cargo_funcionario, salario_funcionario) VALUES ($1, $2, $3) RETURNING *',
      [cpf_funcionario, cargo_funcionario, salario_funcionario]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Erro ao criar funcionario:', error);


    // Verifica se é erro de violação de constraint NOT NULL
    if (error.code === '23502') {
      return res.status(400).json({
        error: 'Dados obrigatórios não fornecidos'
      });
    }

    res.status(500).json({ error: 'Erro interno do servidor' });
  }
}



exports.obterFuncionario = async (req, res) => {
  console.log('funcionarioController -> obterFuncionario com ID:', req.params.id);

  try {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({ error: 'ID deve ser um número válido' });
    }

    const result = await query(
      'SELECT * FROM funcionario WHERE cpf_funcionario = $1',
      [cpf_funcionario]
    );

    console.log('Resultado do SELECT:', result.rows); // Verifica se está retornando algo

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Funcionario não encontrado' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Erro ao obter funcionario:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
}

exports.atualizarFuncionario = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { cargo_funcionario, salario_funcionario} = req.body;

   
    // Verifica se o funcionario existe
    const existingPersonResult = await query(
      'SELECT * FROM funcionario WHERE cpf_funcionario = $1',
      [id]
    );

    if (existingPersonResult.rows.length === 0) {
      return res.status(404).json({ error: 'Funcionario não encontrado' });
    }

    // Constrói a query de atualização dinamicamente para campos não nulos
    const currentPerson = existingPersonResult.rows[0];
    const updatedFields = {
      cargo_funcionario: cargo_funcionario !== undefined ? cargo_funcionario : currentPerson.cargo_funcionario,
      salario_funcionario: salario_funcionario !== undefined ? salario_funcionario : currentPerson.salario_funcionario,
    };

    // Atualiza o funcionario
    const updateResult = await query(
      'UPDATE funcionario SET cargo_funcionario = $1, salario_funcionario = $2 RETURNING *',
      [updatedFields.cargo_funcionario, updatedFields.salario_funcionario, id]
    );

    res.json(updateResult.rows[0]);
  } catch (error) {
    console.error('Erro ao atualizar funcionario:', error);



    res.status(500).json({ error: 'Erro interno do servidor' });
  }
}

exports.deletarFuncionario = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    // Verifica se o funcionario existe
    const existingPersonResult = await query(
      'SELECT * FROM funcionario WHERE cpf_funcionario = $1',
      [id]
    );

    if (existingPersonResult.rows.length === 0) {
      return res.status(404).json({ error: 'Funcionario não encontrado' });
    }

    // Deleta o funcionario (as constraints CASCADE cuidarão das dependências)
    await query(
      'DELETE FROM funcionario WHERE cpf_funcionario = $1',
      [id]
    );

    res.status(204).send();
  } catch (error) {
    console.error('Erro ao deletar funcionario:', error);

    // Verifica se é erro de violação de foreign key (dependências)
    if (error.code === '23503') {
      return res.status(400).json({
        error: 'Não é possível deletar funcionario com dependências associadas'
      });
    }

    res.status(500).json({ error: 'Erro interno do servidor' });
  }
}

// Função adicional para buscar funcionario por descrição
exports.obterFuncionarioPorDescricao = async (req, res) => {
  try {
    const { descricao: descricao } = req.params;

    if (!descricao) {
      return res.status(400).json({ error: 'A descrição é é obrigatória' });
    }

    const result = await query(
      'SELECT * FROM funcionario WHERE cargo_funcionario = $1',
      [descricao]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Funcionario não encontrado' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Erro ao obter funcionario por descrição:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
}

