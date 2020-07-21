const express = require('express');
const router = express.Router();
const validators = require('../controllers/userController');
const productModels = require('../models/productModels');


router.post('/', validators.userValidation, validators.isAdmin, async (req, res) => {
    try {
        const product = await productModels.createProduct
            ({
                nombre_plato: req.body.nombre_plato,
                foto: req.body.foto,
                detalle: req.body.detalle,
                precio: req.body.precio
            })
        res.status(201).json({
            message: `Producto creado con exito `
        })
    } catch (error) {
        res.status(404).json({
            error: 'No se pudo crear el producto.'
        })
    }
});

router.get('/', async (req, res) => {
    try {
        const product = await productModels.getProducts();
        res.status(200).send(product)
    } catch (error) {
        res.status(404).json({
            error: 'No hay productos registrados'
        })
    }
});

router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const productName = await productModels.getProductById(id);
        res.status(200).send(productName);
    } catch (err) {
        res.status(404).json({
            error: 'Producto no encontrado'
        })
    }
});

router.put('/:id', validators.userValidation, validators.isAdmin, async (req, res) => {
    const { id } = req.params;
    try{ 
    const getByProductId = await productModels.updateProductById(req.body, id);
    res.status(201).send('Producto modificado con exito.')
    } catch(err){
        res.status(403).json({
            error: 'No tiene los permisos para realizar esta modificación'
        })
    }
});

router.delete('/:id', validators.userValidation, validators.isAdmin, async (req, res) => {
    try {
        const { id } = req.params;
        await productModels.deleteProductById(id);
        res.status(200).send('Producto eliminado con extito');
    } catch (err) {
        res.status(403).json({
            error: 'No tiene los permisos para realizar esta modificación'
        });
    }
});


module.exports = router; 