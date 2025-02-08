const coap = require('coap');
const pool = require('./init-db'); // Импортируем подключение к БД

const server = coap.createServer(async (req, res) => {
    console.log("Data transmitting");
  if (req.url === '/send-data' && req.method === 'POST') {

    let body = '';

    req.on('data', (chunk) => {
      body += chunk;
    });

    req.on('end', async () => {
      try {
        const data = JSON.parse(body);
        await pool.query('INSERT INTO measurements (sensor_id, sensor_type, sensor_value) VALUES ($1, $2, $3)',
            [data.sensorId, data.sensorType, data.sensorValue]);
        res.code = '2.04'; // 2.04 (Changed) – успешное выполнение
      } catch (error) {
        console.error(error);
        res.code = '5.00'; // 5.00 (Internal Server Error)
      }
      res.end();
    });
  } else {
    res.code = '4.04'; // 4.04 (Not Found)
    res.end();
  }
});

server.listen(5683,
    () => console.log('CoAP-сервер запущен на порту 5683')
);
