const server = require('./config/config');
const { conn } = require("./config/db.js");
require('dotenv').config();
const PORT = process.env.PORT || 3000;

conn.sync({ force: false }).then(() => {
  server.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
  });
});