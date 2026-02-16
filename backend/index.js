const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        // Continue even if DB fails, for demo purposes, or handle appropriately
        return;
    }
    console.log('Connected to MySQL database');
});

app.post('/login', (req, res) => {
    const { id, password } = req.body;
    const sql = "SELECT * FROM users WHERE id = ? AND password = ?";

    db.query(sql, [id, password], (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ success: false, message: 'Database error' });
        }

        if (data.length > 0) {
            return res.json({ success: true, message: 'Login successful' });
        } else {
            return res.json({ success: false, message: 'Invalid ID or Password' });
        }
    });
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
