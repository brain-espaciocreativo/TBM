const express = require('express');
const server = require('./src/config')
const { conn } = require("./src/db.js");

// server.listen(3000, ()=>{
//     console.log('server on port 3000')
// });
conn.sync({ force: true }).then(() => {
    server.listen(3001,() => {
      console.log("Servidor corriendo en el puerto 3001");
    });
  });