-- ==============================
-- POPULAÇÃO DAS TABELAS
-- ==============================

-- 1️⃣ Tabela cargo
INSERT INTO cargo (nome_cargo) VALUES
('Gerente'),
('Vendedor'),
('Caixa'),
('Estoquista'),
('Assistente Administrativo'),
('Analista de Vendas'),
('Atendente'),
('Supervisor'),
('Auxiliar de Limpeza'),
('Segurança');

-- 2️⃣ Tabela categoria
INSERT INTO categoria (nome_categoria) VALUES
('Romance'),
('Ficção Científica'),
('Fantasia'),
('Suspense'),
('Terror'),
('Biografia'),
('Autoajuda'),
('História'),
('Infantil'),
('Aventura');

-- 3️⃣ Tabela pessoa
INSERT INTO pessoa (nome_pessoa, email_pessoa, senha_pessoa, cpf_pessoa) VALUES
('Ana Souza', 'ana.souza@email.com', 'senha123', '11111111111'),
('Bruno Lima', 'bruno.lima@email.com', 'senha123', '22222222222'),
('Carlos Silva', 'carlos.silva@email.com', 'senha123', '33333333333'),
('Daniela Costa', 'daniela.costa@email.com', 'senha123', '44444444444'),
('Eduardo Alves', 'eduardo.alves@email.com', 'senha123', '55555555555'),
('Fernanda Dias', 'fernanda.dias@email.com', 'senha123', '66666666666'),
('Gustavo Rocha', 'gustavo.rocha@email.com', 'senha123', '77777777777'),
('Helena Nunes', 'helena.nunes@email.com', 'senha123', '88888888888'),
('Igor Pereira', 'igor.pereira@email.com', 'senha123', '99999999999'),
('Juliana Ramos', 'juliana.ramos@email.com', 'senha123', '10101010101');

-- 4️⃣ Tabela cliente
INSERT INTO cliente (id_pessoa, endereco_cliente) VALUES
(1, 'Rua das Flores, 123'),
(2, 'Av. Central, 456'),
(3, 'Rua do Sol, 789'),
(4, 'Praça Verde, 321'),
(5, 'Travessa Azul, 654'),
(6, 'Rua das Margaridas, 111'),
(7, 'Av. das Palmeiras, 222'),
(8, 'Rua Nova, 333'),
(9, 'Rua do Campo, 444'),
(10, 'Av. Principal, 555');

-- 5️⃣ Tabela funcionario
INSERT INTO funcionario (id_pessoa, id_cargo, salario_funcionario) VALUES
(1, 1, 5000.00),
(2, 2, 2500.00),
(3, 3, 2200.00),
(4, 4, 2100.00),
(5, 5, 2300.00),
(6, 6, 2600.00),
(7, 7, 2000.00),
(8, 8, 2700.00),
(9, 9, 1800.00),
(10, 10, 1900.00);

-- 6️⃣ Tabela produto
INSERT INTO produto (nome_produto, quant_estoque, preco_produto, id_categoria) VALUES
('A Culpa é das Estrelas', 30, 39.90, 1),
('Duna', 15, 59.90, 2),
('O Hobbit', 25, 49.90, 3),
('Garota Exemplar', 20, 44.90, 4),
('It: A Coisa', 10, 69.90, 5),
('Steve Jobs: A Biografia', 12, 54.90, 6),
('O Poder do Hábito', 18, 42.90, 7),
('História do Brasil', 8, 64.90, 8),
('O Pequeno Príncipe', 40, 29.90, 9),
('As Aventuras de Pi', 22, 46.90, 10);

-- 7️⃣ Tabela pedido
INSERT INTO pedido (data_pedido, id_cliente) VALUES
('2025-10-01', 1),
('2025-10-02', 2),
('2025-10-03', 3),
('2025-10-04', 4),
('2025-10-05', 5),
('2025-10-06', 6),
('2025-10-07', 7),
('2025-10-08', 8),
('2025-10-09', 9),
('2025-10-10', 10);

-- 8️⃣ Tabela carrinho
INSERT INTO carrinho (id_pedido, id_produto, quantidade_carrinho, preco_unitario_carrinho) VALUES
(1, 1, 1, 39.90),
(2, 2, 2, 59.90),
(3, 3, 1, 49.90),
(4, 4, 3, 44.90),
(5, 5, 1, 69.90),
(6, 6, 2, 54.90),
(7, 7, 1, 42.90),
(8, 8, 1, 64.90),
(9, 9, 4, 29.90),
(10, 10, 2, 46.90);
