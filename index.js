const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json()); // Для парсинга JSON

app.get('/', (req, res) => {
    res.send('Hello, world!');
});

// Эндпоинт для приёма данных с датчиков
app.post('/sensors/data', (req, res) => {
    const sensorData = req.body;
    console.log('Принятые данные:', sensorData);

    // В будущем здесь можно сохранять данные в БД
    res.status(200).send(`ID: ${sensorData.ID}<br>Type: ${sensorData.Type}<br>Value: ${sensorData.Value}`);
});

// Запуск сервера
app.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
});
