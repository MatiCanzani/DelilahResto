const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const productRouters = require('./api/routes/products.js')
const orderRouters = require('./api/routes/orders.js')
const userRouters = require('./api/routes/user.js')
const loginRouter = require('./api/routes/login')
const auntenticateRouter = require('./api/routes/verify.js')

app.get('/', (req,res) => {
    res.send('Bienvenido a la API de Delilha Resto')
});
app.use(bodyParser.json(), cors(),);
app.use('/products', productRouters);
app.use('/orders', orderRouters);
app.use('/users', userRouters);
app.use('/login', loginRouter);
app.use('/authentication', auntenticateRouter)

module.exports = app