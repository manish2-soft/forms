const mysql = require('mysql2');
require('dotenv').config();

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    multipleStatements: true
});

const fs = require('fs');
const path = require('path');

const sql = fs.readFileSync(path.join(__dirname, 'tenderform.sql'), 'utf8');

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL server:', err);
        return;
    }
    console.log('Connected to MySQL server');

    connection.query(sql, (err, results) => {
        if (err) {
            console.error('Error executing SQL:', err);
        } else {
            console.log('Database and table created successfully');
        }
        connection.end();
    });
});
