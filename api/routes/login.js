const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const safe = require('../JWT/JWTconfig.js');
const user = require('../controllers/userController')

router.post('/',  async (req, res) => {
    try{
        const { usuario, password } = req.body;
        const userValidation = await user.findUser(usuario, password)
        if (!userValidation) {
            res.status(404).json({
                Error: 'Usario o contraseña invalida'
            })
            return;
        } else {
            delete userValidation.password; // no envia la password a jwt. 
            const token = jwt.sign(userValidation, safe.sign);
            res.json({ token })
        };
    }catch(er) {
        res.send('Usuario no registrado')
    }

});

module.exports = router;


