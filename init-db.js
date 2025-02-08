require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
    connectionString: process.env.DB_CONNECTION_STRING,
    ssl: { rejectUnauthorized: false }
});

async function createTable() {
    try {
        const client = await pool.connect(); // Получаем подключение из пула
        console.log("Подключён к PostgreSQL");

        await client.query(`
            CREATE TABLE IF NOT EXISTS sensor_data (
                id SERIAL PRIMARY KEY,
                sensor_id VARCHAR(50),
                sensor_type VARCHAR(50),
                sensor_value FLOAT,
                timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);

        console.log("Таблица измерений создана.");

        client.release(); // Освобождаем подключение
    } catch (err) {
        console.error("Ошибка создания таблицы измерений:", err);
    }
}

// Вызываем создание таблицы при старте
createTable();

module.exports = pool; // Экспорт пула для других файлов
