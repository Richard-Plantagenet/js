const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json()); // Для парсинга JSON

app.post('/', (req, res) => {
    res.send("OK");
});

// Эндпоинт для приёма данных с датчиков
app.post('/sensors/data', (req, res) => {
    const sensorData = req.body;
    console.log('Принятые данные:', sensorData);

    // В будущем здесь можно сохранять данные в БД
    res.status(200).json({ message: 'Данные приняты' });
});

// Запуск сервера
app.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
});
