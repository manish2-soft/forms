CREATE DATABASE IF NOT EXISTS tenderform;

USE tenderform;

CREATE TABLE IF NOT EXISTS tenders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    incoterm VARCHAR(50),
    pickup VARCHAR(255),
    destination VARCHAR(255),
    cargoValue VARCHAR(100),
    pickupSchedule DATETIME,
    cargoGoods TEXT,
    weight FLOAT,
    volume FLOAT,
    dimension VARCHAR(100),
    shippersCount INT,
    palletCount INT,
    portOfLoading VARCHAR(255),
    portOfDischarge VARCHAR(255),
    temperatureRequirement VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);