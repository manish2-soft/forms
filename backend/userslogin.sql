CREATE DATABASE IF NOT EXISTS userslogin;

USE userslogin;

CREATE TABLE IF NOT EXISTS user (
    id VARCHAR(50) PRIMARY KEY,
    password VARCHAR(50) NOT NULL
);

INSERT INTO user (id, password) VALUES ('test', '1234');

INSERT INTO user (id, password) VALUES ('6104','6104');

INSERT INTO user (id, password) VALUES ('idve','6104');

INSERT INTO user (id, password) VALUES ('123','123');