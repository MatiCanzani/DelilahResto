const bcrypt = require('bcrypt');
const sequelize = require('../database/db')
const jwt = require('jsonwebtoken');
const safe = require('../JWT/JWTconfig.js');
// const userModels = require('../models/userModels');

const getUserData = (usuario) => {
    const userData  = sequelize.query('SELECT * FROM usuarios WHERE usuario = ?', {
        replacements: [usuario],
        type: sequelize.QueryTypes.SELECT
    });
    return  userData;
}

const findUser = async (usuario, password) => {
    const userData  = await getUserData(usuario);
    if (userData) {
        if (!bcrypt.compareSync(password, userData[0].password)) { // compara la pass obtenida del body contra la de la base de datos hasheada. 
            return false;
        }
    }
    return userData[0];
}

const getUserByToken =  async (token) => {
        const userToken = await jwt.verify(token, safe.sign);
        console.log(userToken.id);
        return userToken.id
    }

const getAdminByToken = async (token) => {
    const userToken = await jwt.verify(token, safe.sign);
    console.log(userToken.isAdmin);
    if(userToken.isAdmin == 1) {
        return userToken.isAdmin
    }
    else{
        return userToken.id
    }

}    

const userAuthentication = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const tokenVerification = await jwt.verify(token, safe.sign);
        if (tokenVerification) {
            req.usuario = tokenVerification;
            res.status(200).send('Verificacion realizada con exito.');
            return next();
        }
    } catch (error) {
        res.status(401).json({ error: 'No se puede validar el usuario' })
    }
};



//validar que es Administrador para tener diferentes permisos 
const isAdmin = async (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    const admin = await jwt.verify(token, safe.sign);
    console.log(admin.isAdmin)
    if (admin.isAdmin !== 1) {
        res.status(404).json({
            message: 'No posee permisos para realizar esta acción'
        })
    }
    next();
}

//validar si es usuario registrado. 
const userPermision = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const verifiedUser = await jwt.verify(token, safe.sign);
        const user = verifiedUser.usuario;
        const reqUser = req.params
        if (user !== reqUser.user ) {
            res.status(404).send('Usuario incorrecto, Introduzca su usuario' )
        }
        else {
            next();
        }
    }
    catch (err) { res.status(401).json({ error: 'No se puede validar el usuario' }) }
}

const userValidation = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const verifiedUser = await jwt.verify(token, safe.sign);
        const user = verifiedUser.usuario;
        if (!user) {
            res.status(404).send('Debe realizar login' )
        }
        else {
            next();
        }
    }
    catch (err) { res.status(401).json({ error: 'Debe realizar login' }) }
}

module.exports = { isAdmin, userAuthentication, userPermision, findUser, getUserByToken, getUserData, userValidation, getAdminByToken}