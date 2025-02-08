require('dotenv').config();
const express = require('express');
const { Pool } = require('pg');

const app = express();
const PORT = process.env.PORT || 3000;

// Подключение к PostgreSQL
const pool = new Pool({
    host: "dpg-cujmj38gph6c73bil2s0-a",
    user: "admin",
    password: "tyVB2YSKM3dYjwBeuSUu17KCUDXriQIR",
    database: "greensense",
    port: 5432
});

app.use(express.json());

// Эндпоинт для приёма данных
app.post('/sensors/data', async (req, res) => {
    const { sensor_id, sensor_type, sensor_value } = req.body;

    if (!sensor_id || sensor_type === undefined || sensor_value === undefined) {
        return res.status(400).json({ error: 'Некорректные данные' });
    }

    try {
        const result = await pool.query(
            'INSERT INTO sensor_data (sensor_id, sensor_type, sensor_value) VALUES ($1, $2, $3) RETURNING *',
            [sensor_id, sensor_type, sensor_value]
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
