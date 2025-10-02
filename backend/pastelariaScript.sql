-- Tabela cargo
CREATE TABLE cargo (
    id_cargo SERIAL PRIMARY KEY,
    nome_cargo VARCHAR(100) NOT NULL
);

-- Tabela produto
CREATE TABLE produto (
    id_produto SERIAL PRIMARY KEY,
    nome_produto VARCHAR(100) NOT NULL,
    quant_estoque INT NOT NULL,
    preco_produto NUMERIC(10,2) NOT NULL
);


CREATE TABLE cliente (
    cpf_cliente CHAR(11) PRIMARY KEY,
    endereco_cliente VARCHAR(255)
);

-- Tabela pedido
CREATE TABLE pedido (
    id_pedido SERIAL PRIMARY KEY,
    data_pedido DATE NOT NULL,
    CPF_cliente CHAR(11),
    FOREIGN KEY (CPF_cliente) REFERENCES cliente(CPF_cliente)
);

-- Tabela carrinho (relaciona pedido com produto)
CREATE TABLE carrinho (
    id_pedido INT,
    id_produto INT,
    quantidade_carrinho INT NOT NULL,
    preco_unitario_carrinho NUMERIC(10,2) NOT NULL,
    PRIMARY KEY (id_pedido, id_produto),
    FOREIGN KEY (id_pedido) REFERENCES pedido(id_pedido),
    FOREIGN KEY (id_produto) REFERENCES produto(id_produto)
);

-- Tabela pessoa
CREATE TABLE pessoa (
	id_pessoa INT PRIMARY KEY,
    nome_pessoa VARCHAR(100) NOT NULL,
	email_pessoa VARCHAR(100) NOT NULL,
    senha_pessoa VARCHAR(255) NOT NULL,
	cpf_pessoa CHAR(11)
);

-- Tabela funcionario (herda pessoa e tem FK para cargo)
CREATE TABLE funcionario (
    CPF_funcionario CHAR(11) PRIMARY KEY,
    id_cargo INT,
    salario_funcionario NUMERIC(10,2) NOT NULL,
    FOREIGN KEY (CPF_funcionario) REFERENCES pessoa(CPF_pessoa),
    FOREIGN KEY (id_cargo) REFERENCES cargo(id_cargo)
);

CREATE TABLE categoria (
    id_categoria INT PRIMARY KEY AUTO_INCREMENT,
    nome_categoria VARCHAR(100) NOT NULL
);

INSERT INTO cargo (id_cargo, nome_cargo) VALUES 
(1, 'Dono'),
(2, 'Cozinheira'),
(3, 'Faxineira'),
(4, 'Caixa'),
(5, 'Gerente');

INSERT INTO cliente (cpf_cliente, endereco_cliente) VALUES 
('99999999901', 'Rua das Flores, 123 - São Paulo, SP'),
('99999999902', 'Av. Brasil, 456 - Rio de Janeiro, RJ'),
('99999999903', 'Rua A, 789 - Belo Horizonte, MG'),
('99999999904', 'Travessa B, 321 - Salvador, BA'),
('99999999905', 'Av. Central, 654 - Curitiba, PR');

INSERT INTO pedido (id_pedido, data_pedido, cpf_cliente) VALUES 
(1, '2025-09-15', '99999999901'),
(2, '2025-09-16', '99999999902'),
(3, '2025-09-17', '99999999903'),
(4, '2025-09-18', '99999999904'),
(5, '2025-09-18', '99999999905');

INSERT INTO carrinho (id_pedido, id_produto, quantidade_carrinho, preco_unitario_carrinho) VALUES 
(1, 1, 2, 6.00), 
(2, 4, 1, 5.00), 
(3, 2, 1, 6.00),
(4, 3, 2, 7.00),
(5, 5, 1, 6.50);

INSERT INTO funcionario (cpf_funcionario, id_cargo, salario_funcionario) VALUES 
('99999999901', 1, 5000.00), 
('99999999902', 2, 2500.00), 
('99999999903', 3, 1800.00), 
('99999999904', 4, 1700.00), 
('99999999905', 5, 2000.00);

INSERT INTO pessoa (id_pessoa, nome_pessoa, email_pessoa, senha_pessoa, cpf_pessoa) VALUES 
(1, 'João', 'joao@email.com', 'joaoSenha', '99999999901'),
(2, 'Maria', 'maria@email.com', 'mariaSenha', '99999999902'),
(3, 'Carlos', 'carlos@email.com', 'carlosSenha', '99999999903'),
(4, 'Ana', 'ana@email.com', 'anaSenha', '99999999904'),
(5, 'Bruno', 'bruno@email.com', 'brunoSenha', '99999999905');

INSERT INTO produto (id_produto, nome_produto, quant_estoque, preco_produto) VALUES 
(1, 'Pastel de Carne', 50, 6.00),
(2, 'Pastel de Queijo', 40, 5.50),
(3, 'Pastel de Frango com Catupiry', 30, 7.00),
(4, 'Coca-Cola Lata', 80, 4.00),
(5, 'Suco Natural de Laranja', 60, 6.50);

INSERT INTO categoria (id_categoria, nome_categoria) VALUES
(1, 'Pastéis Salgados'),
(2, 'Pastéis Doces'),
(3, 'Refrigerantes'),
(4, 'Sucos');