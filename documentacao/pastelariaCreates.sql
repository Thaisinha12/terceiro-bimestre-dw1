-- Tabela cargo
CREATE TABLE cargo (
    id_cargo SERIAL PRIMARY KEY,
    nome_cargo VARCHAR(100) NOT NULL
);

-- Tabela categoria
CREATE TABLE categoria (
    id_categoria SERIAL PRIMARY KEY,
    nome_categoria VARCHAR(100) NOT NULL
);

-- Tabela pessoa
CREATE TABLE pessoa (
    id_pessoa SERIAL PRIMARY KEY,
    nome_pessoa VARCHAR(100) NOT NULL,
    email_pessoa VARCHAR(100) NOT NULL,
    senha_pessoa VARCHAR(255) NOT NULL,
    cpf_pessoa CHAR(11) UNIQUE NOT NULL
);

-- Tabela cliente (herda pessoa)
CREATE TABLE cliente (
    id_pessoa INT PRIMARY KEY,
    endereco_cliente VARCHAR(255),
    FOREIGN KEY (id_pessoa) REFERENCES pessoa(id_pessoa)
);

-- Tabela funcionario (herda pessoa e tem FK para cargo)
CREATE TABLE funcionario (
    id_pessoa INT PRIMARY KEY,
    id_cargo INT NOT NULL,
    salario_funcionario NUMERIC(10,2) NOT NULL,
    FOREIGN KEY (id_pessoa) REFERENCES pessoa(id_pessoa),
    FOREIGN KEY (id_cargo) REFERENCES cargo(id_cargo)
);

-- Tabela produto
CREATE TABLE produto (
    id_produto SERIAL PRIMARY KEY,
    nome_produto VARCHAR(100) NOT NULL,
    quant_estoque INT NOT NULL,
    preco_produto NUMERIC(10,2) NOT NULL,
    id_categoria INT,
    FOREIGN KEY (id_categoria) REFERENCES categoria(id_categoria)
);

-- Tabela pedido
CREATE TABLE pedido (
    id_pedido SERIAL PRIMARY KEY,
    data_pedido DATE NOT NULL,
    id_cliente INT,
    FOREIGN KEY (id_cliente) REFERENCES cliente(id_pessoa)
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
