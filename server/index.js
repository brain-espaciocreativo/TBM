const server = require('./config/config');
const { conn } = require("./config/db.js");
require('dotenv').config();
const PORT = process.env.PORT || 3000;

require('./models/User.js');
require('./models/Work.js');
require('./models/News.js');
require('./models/Categories');

conn.sync({ force: true }).then(() => {
  server.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
  });
});