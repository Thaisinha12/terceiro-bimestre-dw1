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

-- Tabela pagamento
CREATE TABLE public.pagamento (
    id_pagamento INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    pedido_id_pedido INT NOT NULL,
    data_pagamento TIMESTAMP NOT NULL,
    valor_total_pagamento FLOAT8 NOT NULL,

    nome_cartao VARCHAR(100) NOT NULL,
    numero_cartao VARCHAR(19) NOT NULL,   
    validade CHAR(5) NOT NULL,            
    cvv CHAR(3) NOT NULL,                 
    tipo_cartao VARCHAR(20) NOT NULL,

    -- Aceita: 1234567812345678 OU 1234 5678 1234 5678
    CONSTRAINT pagamento_numero_cartao_chk 
        CHECK (numero_cartao ~ '^[0-9]{16}$' OR numero_cartao ~ '^[0-9]{4} [0-9]{4} [0-9]{4} [0-9]{4}$'),

    CONSTRAINT pagamento_validade_chk 
        CHECK (validade ~ '^(0[1-9]|1[0-2])\/\\d{2}$'),

    CONSTRAINT pagamento_cvv_chk 
        CHECK (cvv ~ '^[0-9]{3}$'),

    CONSTRAINT fk_pagamento_pedido 
        FOREIGN KEY (pedido_id_pedido)
        REFERENCES public.pedido (id_pedido)
        ON DELETE CASCADE
);




