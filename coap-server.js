const coap = require('coap');
const pool = require('./init-db'); // Импортируем подключение к БД

const server = coap.createServer(async (req, res) => {
  if (req.url === '/send-data' && req.method === 'POST') {
    let body = '';

    req.on('data', (chunk) => {
      body += chunk;
    });

    req.on('end', async () => {
      try {
        const data = JSON.parse(body);
        await pool.query('INSERT INTO sensors (temperature, humidity) VALUES ($1, $2)', [data.temp, data.hum]);
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

server.listen(() => console.log('CoAP-сервер запущен'));
