const express = require('express');
const pool = require('./init-db');

const app = express();
app.use(express.json()); // Для обработки JSON-запросов

// Эндпоинт для получения данных с датчиков
app.get('/send-data', async (req, res) => {
    console.log(req.body);
    res.status(200).send("OK");
    /*
    const client = await pool.connect();  // Берём клиент из пула
    try {
        const result = await pool.query('SELECT * FROM measurements ORDER BY timestamp DESC LIMIT 50');
        res.status(200).json(result.rows);
    } catch (err) {
        console.error('Ошибка выполнения запроса:', err);
        res.status(500).send('Ошибка сервера');
    } finally {
        client.release();  // Освобождаем клиент после использования
    }
        */
});

// Запуск HTTP-сервера
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`HTTP-сервер запущен на порту ${PORT}`);
});


/*
const express = require('express');

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

app.get('/', (req, res) => {
    res.status(200).send("OK");
});

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
*/