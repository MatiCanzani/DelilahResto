const sequelize = require('../database/db');


module.exports = {
    createProduct: async (product) => {
        const productCreated = await sequelize.query(
            "INSERT INTO productos (nombre_plato, foto,detalle, precio) VALUES (?, ?, ?, ?)",
            {
                replacements: [
                    product.nombre_plato,
                    product.foto,
                    product.detalle,
                    product.precio,
                ],
            })
        return productCreated
    },

    getProducts: async () => {
        const products = await sequelize.query('SELECT * FROM productos',
            { type: sequelize.QueryTypes.SELECT }
        );
        return products
    },

    getProductById: async (id) => {
        const productById = await sequelize.query('SELECT * FROM productos WHERE id = ?',
            { replacements: [id], type: sequelize.QueryTypes.SELECT }
        );
        return productById
    },

    updateProductById: async (product,id) => {
        try {
            const productUpdated = await sequelize.query(
                'UPDATE productos SET nombre_plato = ?, foto = ?, detalle = ?, precio = ? WHERE id = ?',
                {
                    replacements: [
                        product.nombre_plato,
                        product.foto,
                        product.detalle,
                        product.precio,
                        id
                    ],
                });
                console.log(productUpdated)
                res.send(productUpdated)
            return productUpdated
        } catch (error) {
            'no se pudo actualizar el producto de la base de datos'
        }
    },

    deleteproductById: async (id) => {
        try {
            const productDeleted = await sequelize.query(
                ' DELETE FROM productos WHERE id = ?',
                {
                    replacements: [id],
                })
            return productDeleted;
        } catch (err) {
            'no se puede eliminar el producto de la base de datos'
        };
    }

}
