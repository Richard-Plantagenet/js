const express = require('express');
const pool = require('./init-db');

const app = express();
app.use(express.json()); // Для обработки JSON-запросов

// Эндпоинт для получения данных с датчиков
app.get('/api/sensors', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM sensor_data ORDER BY timestamp DESC LIMIT 50');
    res.json(result.rows);
  } catch (err) {
    console.error('Ошибка при запросе данных:', err);
    res.status(500).send('Ошибка сервера');
  }
});

// Запуск HTTP-сервера
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`HTTP-сервер запущен на порту ${PORT}`);
});
