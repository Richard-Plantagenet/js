const { Client } = require('pg');

const client = new Client({
    connectionString: "postgresql://admin:tyVB2YSKM3dYjwBeuSUu17KCUDXriQIR@dpg-cujmj38gph6c73bil2s0-a/greensense",//process.env.DATABASE_URL, // Render автоматически создаёт эту переменную
    ssl: { rejectUnauthorized: false }
});

async function createTable() {
    try {
        await client.connect();
        console.log("Connected to PostgreSQL");

        await client.query(`
            CREATE TABLE sensor_data (
                id SERIAL PRIMARY KEY,
                sensor_id VARCHAR(50),
                sensor_type VARCHAR(50),
                sensor_value FLOAT,
                timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);
        /*
        CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            name TEXT NOT NULL,
            email TEXT UNIQUE NOT NULL,
            created_at TIMESTAMP DEFAULT NOW()
        );*/

        console.log("Таблица измерений создана.");
    } catch (err) {
        console.error("Error creating table:", err);
    } finally {
        await client.end();
    }
}

createTable();
