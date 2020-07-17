const express = require('express');
const router = express.Router();

const validateUser = require('../controllers/userController')

router.post('/', validateUser.userAuthentication, (req, res) => {
    res.status(201).json(`Esta pagina esta autenticada. Bienvenido ${req.usuario.nombre}`)
})
module.exports = router;
