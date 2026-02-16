CREATE DATABASE IF NOT EXISTS userlogin;

USE userlogin;

CREATE TABLE IF NOT EXISTS users (
    id VARCHAR(50) PRIMARY KEY,
    password VARCHAR(255) NOT NULL
);

INSERT INTO users (id, password) VALUES ('user123', 'admin123');

INSERT INTO users (id, password) VALUES ('test', '1234');

INSERT INTO users (id, password) VALUES ('123', '123');