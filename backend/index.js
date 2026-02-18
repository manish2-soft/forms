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
        return;
    }
    console.log('Connected to MySQL database');
});

// Tender Form Database Connection
const tenderDb = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.TENDER_DB_NAME
});

tenderDb.connect((err) => {
    if (err) {
        console.error('Error connecting to Tender Form MySQL:', err);
    } else {
        console.log('Connected to Tender Form MySQL database');
    }
});


app.post('/login', (req, res) => {
    const { id, password } = req.body;
    const sql = "SELECT * FROM user WHERE id = ? AND password = ?";

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

// Tender Form Submission Endpoint
app.post('/tenders', (req, res) => {
    const {
        incoterm, pickup, destination, cargoValue, pickupSchedule,
        cargoGoods, weight, volume, dimension, shippersCount,
        palletCount, portOfLoading, portOfDischarge, temperatureRequirement
    } = req.body;

    const sql = `INSERT INTO tenders (
        incoterm, pickup, destination, cargoValue, pickupSchedule,
        cargoGoods, weight, volume, dimension, shippersCount,
        palletCount, portOfLoading, portOfDischarge, temperatureRequirement
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    const values = [
        incoterm, pickup, destination, cargoValue, (pickupSchedule && pickupSchedule.trim() !== '') ? pickupSchedule : null,
        cargoGoods, weight, volume, dimension, shippersCount,
        palletCount, portOfLoading, portOfDischarge, temperatureRequirement
    ];

    tenderDb.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error saving tender:', err);
            return res.status(500).json({ success: false, message: 'Failed to save tender' });
        }
        return res.json({ success: true, message: 'Tender submitted successfully', id: result.insertId });
    });
});

// Get All Tenders Endpoint
app.get('/tenders', (req, res) => {
    const sql = "SELECT * FROM tenders ORDER BY created_at DESC";
    tenderDb.query(sql, (err, data) => {
        if (err) {
            console.error('Error fetching tenders:', err);
            return res.status(500).json({ success: false, message: 'Failed to fetch tenders' });
        }
        return res.json({ success: true, tenders: data });
    });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
