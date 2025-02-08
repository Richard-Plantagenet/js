const express = require('express');
const pool = require('./init-db');

const app = express();
app.use(express.json()); // Для обработки JSON-запросов

// Эндпоинт для получения данных с датчиков
app.get('/api/sensors', async (req, res) => {
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
});

// Запуск HTTP-сервера
const PORT = 10000;
app.listen(PORT, () => {
  console.log(`HTTP-сервер запущен на порту ${PORT}`);
});
