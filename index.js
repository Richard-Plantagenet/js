require('dotenv').config();
const express = require('express');
const { Pool } = require('pg');

const app = express();
const PORT = process.env.PORT || 3000;

// Подключение к PostgreSQL
const pool = new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
});

app.use(express.json());

// Эндпоинт для приёма данных
app.post('/sensors/data', async (req, res) => {
    const { sensor_id, temperature, humidity } = req.body;

    if (!sensor_id || temperature === undefined || humidity === undefined) {
        return res.status(400).json({ error: 'Некорректные данные' });
    }

    try {
        const result = await pool.query(
            'INSERT INTO sensor_data (sensor_id, temperature, humidity) VALUES ($1, $2, $3) RETURNING *',
            [sensor_id, temperature, humidity]
        );
        res.status(201).json({ message: 'Данные сохранены', data: result.rows[0] });
    } catch (error) {
        console.error('Ошибка при сохранении данных:', error);
        res.status(500).json({ error: 'Ошибка сервера' });
    }
});

// Запуск сервера
app.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
});
