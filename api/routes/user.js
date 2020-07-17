const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const validators = require('../controllers/userController');
const userModels = require('../models/userModels');

router.post('/', (req, res) => {
    bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) {
            return res.status(500).json({
                error: 'No se pudo crear el usuario'
            })
        }
        else {
            const user = userModels.createUser
                ({
                    usuario: req.body.usuario,
                    nombre: req.body.nombre,
                    apellido: req.body.apellido,
                    email: req.body.email,
                    telefono: req.body.telefono,
                    direccion: req.body.direccion,
                    password: hash
                });
            res.status(201).json({
                message: 'usuario creado con exito',
            });
        };
    })
});

router.get('/', validators.isAdmin, async (req, res) => {
    try {
        const user = await userModels.getUsers();
        res.status(200).send(user)
    } catch (error) {
        res.status(404).json({
            error: 'No tienes permisos para realizar esta acción'
        })
    }
});

router.get('/:user', validators.userPermision, async (req, res) => {
    try {
        const { user } = req.params;
            const userByUser = await userModels.getUserByUser(user);
            res.status(200).send(userByUser)
    } catch (err) {
        res.status(404).json({
            error: 'Debe estar registrado para realizar esta consulta'
        })
    }
});

router.put('/:id',validators.isAdmin, async (req, res) => {
    const { id } = req.params;
    console.log(id)      
    try{ 
    const userById = await userModels.updateUserById(req.body, id);
    console.log(userById)
    res.status(201).send(`Los cambios se realizaron con exito`)
    } catch(err){
        res.status(403).json({
            error: 'No tiene los permisos para realizar esta modificación'
        })
    }
});     

router.delete('/:id', validators.isAdmin, async (req, res) => {
    try {
        const { id } = req.params;
        await userModels.deleteUserById(id);
        res.status(200).send({ Message: `Usuario eliminado con éxito!`});
    } catch (err) {
        res.status(403).json({
            error: 'No se pudo eliminar el usuario'
        });
    };
});

module.exports = router

