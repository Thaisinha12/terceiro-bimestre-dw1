-- Tabela cargo
INSERT INTO cargo (id_cargo, nome_cargo) VALUES (1, 'Atendente');
INSERT INTO cargo (id_cargo, nome_cargo) VALUES (2, 'Cozinheiro');
INSERT INTO cargo (id_cargo, nome_cargo) VALUES (3, 'Gerente');
INSERT INTO cargo (id_cargo, nome_cargo) VALUES (4, 'Auxiliar de Limpeza');
INSERT INTO cargo (id_cargo, nome_cargo) VALUES (5, 'Caixa');
INSERT INTO cargo (id_cargo, nome_cargo) VALUES (6, 'Entregador');
INSERT INTO cargo (id_cargo, nome_cargo) VALUES (7, 'Supervisor');
INSERT INTO cargo (id_cargo, nome_cargo) VALUES (8, 'Auxiliar de Cozinha');
INSERT INTO cargo (id_cargo, nome_cargo) VALUES (9, 'Chapeiro');
INSERT INTO cargo (id_cargo, nome_cargo) VALUES (10, 'Estoquista');

-- Tabela categoria
INSERT INTO categoria (id_categoria, nome_categoria) VALUES (1, 'Salgado');
INSERT INTO categoria (id_categoria, nome_categoria) VALUES (2, 'Doce');
INSERT INTO categoria (id_categoria, nome_categoria) VALUES (3, 'Bebida');
INSERT INTO categoria (id_categoria, nome_categoria) VALUES (4, 'Vegano');
INSERT INTO categoria (id_categoria, nome_categoria) VALUES (5, 'Combo');
INSERT INTO categoria (id_categoria, nome_categoria) VALUES (6, 'Sobremesa');
INSERT INTO categoria (id_categoria, nome_categoria) VALUES (7, 'Especial');
INSERT INTO categoria (id_categoria, nome_categoria) VALUES (8, 'Promoção');
INSERT INTO categoria (id_categoria, nome_categoria) VALUES (9, 'Refrigerante');
INSERT INTO categoria (id_categoria, nome_categoria) VALUES (10, 'Suco');

-- Tabela pessoa
INSERT INTO pessoa (id_pessoa, nome_pessoa, email_pessoa, senha_pessoa, cpf_pessoa)
VALUES (1, 'João Silva', 'joao@email.com', 'senha123', '12345678901');
INSERT INTO pessoa (id_pessoa, nome_pessoa, email_pessoa, senha_pessoa, cpf_pessoa)
VALUES (2, 'Maria Oliveira', 'maria@email.com', 'senha123', '12345678902');
INSERT INTO pessoa (id_pessoa, nome_pessoa, email_pessoa, senha_pessoa, cpf_pessoa)
VALUES (3, 'Carlos Souza', 'carlos@email.com', 'senha123', '12345678903');
INSERT INTO pessoa (id_pessoa, nome_pessoa, email_pessoa, senha_pessoa, cpf_pessoa)
VALUES (4, 'Ana Lima', 'ana@email.com', 'senha123', '12345678904');
INSERT INTO pessoa (id_pessoa, nome_pessoa, email_pessoa, senha_pessoa, cpf_pessoa)
VALUES (5, 'Lucas Rocha', 'lucas@email.com', 'senha123', '12345678905');
INSERT INTO pessoa (id_pessoa, nome_pessoa, email_pessoa, senha_pessoa, cpf_pessoa)
VALUES (6, 'Juliana Costa', 'juliana@email.com', 'senha123', '12345678906');
INSERT INTO pessoa (id_pessoa, nome_pessoa, email_pessoa, senha_pessoa, cpf_pessoa)
VALUES (7, 'Paulo Mendes', 'paulo@email.com', 'senha123', '12345678907');
INSERT INTO pessoa (id_pessoa, nome_pessoa, email_pessoa, senha_pessoa, cpf_pessoa)
VALUES (8, 'Fernanda Dias', 'fernanda@email.com', 'senha123', '12345678908');
INSERT INTO pessoa (id_pessoa, nome_pessoa, email_pessoa, senha_pessoa, cpf_pessoa)
VALUES (9, 'Bruno Martins', 'bruno@email.com', 'senha123', '12345678909');
INSERT INTO pessoa (id_pessoa, nome_pessoa, email_pessoa, senha_pessoa, cpf_pessoa)
VALUES (10, 'Camila Ribeiro', 'camila@email.com', 'senha123', '12345678910');

-- Tabela cliente
INSERT INTO cliente (id_pessoa, endereco_cliente) VALUES (1, 'Rua A, 123');
INSERT INTO cliente (id_pessoa, endereco_cliente) VALUES (2, 'Rua B, 456');
INSERT INTO cliente (id_pessoa, endereco_cliente) VALUES (3, 'Av. Central, 789');
INSERT INTO cliente (id_pessoa, endereco_cliente) VALUES (4, 'Rua das Flores, 101');
INSERT INTO cliente (id_pessoa, endereco_cliente) VALUES (5, 'Rua das Laranjeiras, 202');
INSERT INTO cliente (id_pessoa, endereco_cliente) VALUES (6, 'Rua São João, 303');
INSERT INTO cliente (id_pessoa, endereco_cliente) VALUES (7, 'Rua Bela Vista, 404');
INSERT INTO cliente (id_pessoa, endereco_cliente) VALUES (8, 'Rua do Comércio, 505');
INSERT INTO cliente (id_pessoa, endereco_cliente) VALUES (9, 'Rua do Sol, 606');
INSERT INTO cliente (id_pessoa, endereco_cliente) VALUES (10, 'Rua das Palmeiras, 707');

-- Tabela funcionario
INSERT INTO funcionario (id_pessoa, id_cargo, salario_funcionario) VALUES (1, 1, 1800.00);
INSERT INTO funcionario (id_pessoa, id_cargo, salario_funcionario) VALUES (2, 2, 2000.00);
INSERT INTO funcionario (id_pessoa, id_cargo, salario_funcionario) VALUES (3, 3, 3000.00);
INSERT INTO funcionario (id_pessoa, id_cargo, salario_funcionario) VALUES (4, 4, 1600.00);
INSERT INTO funcionario (id_pessoa, id_cargo, salario_funcionario) VALUES (5, 5, 1900.00);
INSERT INTO funcionario (id_pessoa, id_cargo, salario_funcionario) VALUES (6, 6, 1700.00);
INSERT INTO funcionario (id_pessoa, id_cargo, salario_funcionario) VALUES (7, 7, 2500.00);
INSERT INTO funcionario (id_pessoa, id_cargo, salario_funcionario) VALUES (8, 8, 1800.00);
INSERT INTO funcionario (id_pessoa, id_cargo, salario_funcionario) VALUES (9, 9, 2200.00);
INSERT INTO funcionario (id_pessoa, id_cargo, salario_funcionario) VALUES (10, 10, 1650.00);

-- Tabela produto
INSERT INTO produto (id_produto, nome_produto, quant_estoque, preco_produto, id_categoria)
VALUES (1, 'Pastel de Carne', 50, 7.50, 1);
INSERT INTO produto (id_produto, nome_produto, quant_estoque, preco_produto, id_categoria)
VALUES (2, 'Pastel de Queijo', 40, 7.00, 1);
INSERT INTO produto (id_produto, nome_produto, quant_estoque, preco_produto, id_categoria)
VALUES (3, 'Pastel de Chocolate', 30, 8.00, 2);
INSERT INTO produto (id_produto, nome_produto, quant_estoque, preco_produto, id_categoria)
VALUES (4, 'Suco de Laranja', 20, 5.00, 10);
INSERT INTO produto (id_produto, nome_produto, quant_estoque, preco_produto, id_categoria)
VALUES (5, 'Coca-Cola Lata', 25, 6.00, 9);
INSERT INTO produto (id_produto, nome_produto, quant_estoque, preco_produto, id_categoria)
VALUES (6, 'Combo Pastel + Refri', 15, 12.00, 5);
INSERT INTO produto (id_produto, nome_produto, quant_estoque, preco_produto, id_categoria)
VALUES (7, 'Pastel Vegano', 10, 8.50, 4);
INSERT INTO produto (id_produto, nome_produto, quant_estoque, preco_produto, id_categoria)
VALUES (8, 'Pastel Especial', 12, 10.00, 7);
INSERT INTO produto (id_produto, nome_produto, quant_estoque, preco_produto, id_categoria)
VALUES (9, 'Mousse de Maracujá', 18, 4.50, 6);
INSERT INTO produto (id_produto, nome_produto, quant_estoque, preco_produto, id_categoria)
VALUES (10, 'Suco de Uva', 22, 5.00, 10);

-- Continuação da tabela pedido
INSERT INTO pedido (id_pedido, data_pedido, id_cliente) VALUES (1, '2025-10-02', 3);
INSERT INTO pedido (id_pedido, data_pedido, id_cliente) VALUES (2, '2025-10-02', 3);
INSERT INTO pedido (id_pedido, data_pedido, id_cliente) VALUES (3, '2025-10-02', 3);
INSERT INTO pedido (id_pedido, data_pedido, id_cliente) VALUES (4, '2025-10-02', 4);
INSERT INTO pedido (id_pedido, data_pedido, id_cliente) VALUES (5, '2025-10-03', 5);
INSERT INTO pedido (id_pedido, data_pedido, id_cliente) VALUES (6, '2025-10-03', 6);
INSERT INTO pedido (id_pedido, data_pedido, id_cliente) VALUES (7, '2025-10-04', 7);
INSERT INTO pedido (id_pedido, data_pedido, id_cliente) VALUES (8, '2025-10-04', 8);
INSERT INTO pedido (id_pedido, data_pedido, id_cliente) VALUES (9, '2025-10-05', 9);
INSERT INTO pedido (id_pedido, data_pedido, id_cliente) VALUES (10, '2025-10-05', 10);

-- Tabela carrinho (relacionando pedidos com produtos)
INSERT INTO carrinho (id_pedido, id_produto, quantidade_carrinho, preco_unitario_carrinho)
VALUES (1, 1, 2, 7.50);
INSERT INTO carrinho (id_pedido, id_produto, quantidade_carrinho, preco_unitario_carrinho)
VALUES (2, 2, 1, 7.00);
INSERT INTO carrinho (id_pedido, id_produto, quantidade_carrinho, preco_unitario_carrinho)
VALUES (3, 5, 2, 6.00);
INSERT INTO carrinho (id_pedido, id_produto, quantidade_carrinho, preco_unitario_carrinho)
VALUES (4, 3, 1, 8.00);
INSERT INTO carrinho (id_pedido, id_produto, quantidade_carrinho, preco_unitario_carrinho)
VALUES (5, 6, 1, 12.00);
INSERT INTO carrinho (id_pedido, id_produto, quantidade_carrinho, preco_unitario_carrinho)
VALUES (6, 4, 3, 5.00);
INSERT INTO carrinho (id_pedido, id_produto, quantidade_carrinho, preco_unitario_carrinho)
VALUES (7, 7, 1, 8.50);
INSERT INTO carrinho (id_pedido, id_produto, quantidade_carrinho, preco_unitario_carrinho)
VALUES (8, 9, 2, 4.50);
INSERT INTO carrinho (id_pedido, id_produto, quantidade_carrinho, preco_unitario_carrinho)
VALUES (9, 8, 1, 10.00);
INSERT INTO carrinho (id_pedido, id_produto, quantidade_carrinho, preco_unitario_carrinho)
VALUES (10, 10, 2, 5.00);

--Tabela pedido_has_produto
INSERT INTO pedido_has_produto (produto_id_produto, pedido_id_pedido, quantidade, preco_unitario)
VALUES (2, 1, 2, 7.00);   
INSERT INTO pedido_has_produto (produto_id_produto, pedido_id_pedido, quantidade, preco_unitario)
VALUES (3, 1, 1, 8.00);   
INSERT INTO pedido_has_produto (produto_id_produto, pedido_id_pedido, quantidade, preco_unitario)
VALUES (9, 2, 3, 6.00);  
INSERT INTO pedido_has_produto (produto_id_produto, pedido_id_pedido, quantidade, preco_unitario)
VALUES (10, 3, 1, 5.00);  
INSERT INTO pedido_has_produto (produto_id_produto, pedido_id_pedido, quantidade, preco_unitario)
VALUES (11, 3, 2, 4.00);  
INSERT INTO pedido_has_produto (produto_id_produto, pedido_id_pedido, quantidade, preco_unitario)
VALUES (6, 4, 1, 5.00);   
INSERT INTO pedido_has_produto (produto_id_produto, pedido_id_pedido, quantidade, preco_unitario)
VALUES (7, 4, 1, 5.00);   
INSERT INTO pedido_has_produto (produto_id_produto, pedido_id_pedido, quantidade, preco_unitario)
VALUES (5, 5, 2, 7.50);   
INSERT INTO pedido_has_produto (produto_id_produto, pedido_id_pedido, quantidade, preco_unitario)
VALUES (4, 6, 1, 5.00);   
INSERT INTO pedido_has_produto (produto_id_produto, pedido_id_pedido, quantidade, preco_unitario)
VALUES (8, 6, 1, 4.00);   
INSERT INTO pedido_has_produto (produto_id_produto, pedido_id_pedido, quantidade, preco_unitario)
VALUES (12, 7, 1, 10.00); 
INSERT INTO pedido_has_produto (produto_id_produto, pedido_id_pedido, quantidade, preco_unitario)
VALUES (13, 8, 1, 7.50);  
INSERT INTO pedido_has_produto (produto_id_produto, pedido_id_pedido, quantidade, preco_unitario)
VALUES (14, 9, 2, 7.50);  
INSERT INTO pedido_has_produto (produto_id_produto, pedido_id_pedido, quantidade, preco_unitario)
VALUES (15, 10, 1, 8.50); 
INSERT INTO pedido_has_produto (produto_id_produto, pedido_id_pedido, quantidade, preco_unitario)
VALUES (16, 11, 3, 4.50); 
INSERT INTO pedido_has_produto (produto_id_produto, pedido_id_pedido, quantidade, preco_unitario)
VALUES (17, 12, 1, 6.00); 
INSERT INTO pedido_has_produto (produto_id_produto, pedido_id_pedido, quantidade, preco_unitario)
VALUES (18, 12, 1, 4.00); 
INSERT INTO pedido_has_produto (produto_id_produto, pedido_id_pedido, quantidade, preco_unitario)
VALUES (19, 13, 2, 6.00);
INSERT INTO pedido_has_produto (produto_id_produto, pedido_id_pedido, quantidade, preco_unitario)
VALUES (20, 14, 1, 4.50); 
INSERT INTO pedido_has_produto (produto_id_produto, pedido_id_pedido, quantidade, preco_unitario)
VALUES (21, 15, 1, 9.00); 



