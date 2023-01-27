-- Active: 1674731741478@@127.0.0.1@3306

CREATE TABLE users (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    password TEXT NOT NULL
);

INSERT INTO users (id, name, email, password)
VALUES
    ("u001", "Lucas Rodrigues", "lucas@labenu.com","12345"),
    ("u002", "Renata Muniz","renata@labenu.com","56789"),
    ("u003", "AstroDev","dev@labenu.com","labenu123");
    
SELECT * FROM users;

CREATE TABLE product(
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    price REAL NOT NULL,
    description TEXT NOT NULL,
    imageUrl TEXT NOT NULL
);

INSERT INTO product (id, name, price, description, imageUrl)
VALUES
("p001", "Brownie Tradicional", 6.00, "Brownie Tradicional estilo americano", "https://picsum.photos/200/300/?blur=2"),
("p002", "Pão de Mel", 4.00, "O melhor Pão de Mel da cidade", "https://picsum.photos/200/300/?blur=2");

SELECT * FROM product;

DROP TABLE product;
DROP TABLE users;
