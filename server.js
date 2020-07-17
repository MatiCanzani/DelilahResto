const express = require('express');
const server = require('./app');
const sequelize = require('../delilahresto/api/database/db');

const port = process.env.PORT || 8000;

server.listen(port, () => {
    console.log('Server iniciado con éxito');
    sequelize.authenticate().then(()=>{
         console.log('Conectado con éxito a la base de datos');
     })
      .catch(err =>{
        console.log( error = 'se ha producido un error al conectar con la base de datos')
    
});
})
