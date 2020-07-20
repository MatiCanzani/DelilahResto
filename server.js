const server = require('./app');
const sequelize = require('./api/database/db');
const cors = require('cors');
const PORT = process.env.PORT || 3000;

server.use(cors());
server.listen(PORT, () => {
    console.log('Server iniciado con éxito');
    sequelize.authenticate().then(()=>{
         console.log('Conectado con éxito a la base de datos');
     })
      .catch(err =>{
        console.log( error = 'se ha producido un error al conectar con la base de datos')
});
})
