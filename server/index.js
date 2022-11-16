const server = require('./config/config');
require('dotenv').config();
const { conn } = require('./models');
const PORT = process.env.PORT || 3000;

conn.sync({force: false}).then(() => {
  server.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
  });
});