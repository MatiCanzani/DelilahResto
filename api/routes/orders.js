const express = require('express');
const router = express.Router();
const validators = require('../controllers/userController');
const orderModels = require('../models/orderModules');


router.post('/',validators.userValidation, async (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    const userId = await validators.getUserByToken(token);
    const order = await orderModels.createOrder(req.body, userId);
    res.status(201).send('Orden creada con exito');

});

router.get ('/', validators.userValidation, async (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    const order = await orderModels.getOrdersbyUser(token);
    // const order = await orderModels.getOrders();
    res.status(200).json(order);
});

router.get('/:id', validators.userValidation, validators.userPermision,  async (req, res) => {
     try {
        const { id } = req.params;
        const orderByid = await orderModels.getOrdersById(id);
        res.status(200).send(orderByid)
    } catch (err) {
        res.status(404).json({
            error: 'No tiene los permisos para realizar esa consulta'
        })
    }
});

router.patch('/:id',validators.userValidation, validators.isAdmin, async (req, res) => {
        const { id } = req.params;
        const orderByid = await orderModels.updateOrderById(req.body, id);
    res.status(201).send(orderByid)
});

router.delete('/:id',validators.userValidation, validators.isAdmin, async (req, res) => {
    const { id } = req.params;
    await orderModels.deleteOrderById(id);
    res.status(201).json({
        message: 'oder borrada',
    });
});

module.exports = router;