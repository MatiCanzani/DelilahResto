const sequelize = require('../database/db');




const createOrder = async (order, id) => {
    const products = Array.from(order.producto_id);
    const orderCreated = await sequelize.query(
        "INSERT INTO pedidos(forma_de_pago, usuario_id) VALUES (?, ?)",
        {
            replacements: [
                order.forma_de_pago,
                id,
            ]
        });
    const orderNumber = await orderCreated[0];
    for (let i = 0; i < products.length; i++) {
        const singleId = products[i];
        const productId = await sequelize.query(
            `INSERT INTO pedidos_productos (producto_id , pedido_id, cantidad) VALUES (?, ?, 1)`,
            {
                replacements: [
                    singleId,
                    orderNumber,
                ],
            });
    };
    const getTotal = async () => {
        const total = await sequelize.query(
            `SELECT  SUM (precio) FROM pedidos
        JOIN pedidos_productos ON pedidos.id = pedidos_productos.pedido_id
        JOIN productos ON pedidos_productos.producto_id = productos.id
        WHERE pedido_id = ?`,
            {
                replacements: [orderNumber],
                type: sequelize.QueryTypes.SELECT,
            });
        const totalOrder = (parseInt((Object.values(total[0]))));
        return totalOrder;
    };
    const total = await getTotal();
    const orderTotal = await sequelize.query(
        "UPDATE pedidos SET total=? WHERE id = ? ",
        {
            replacements: [
                total,
                orderNumber
            ]
        });
    return products
};
const getOrdersById = async (id) => {
    const orders = await sequelize.query(
        `SELECT pedido_id, GROUP_CONCAT(nombre_plato separator ', ') AS descripcion, nombre, apellido , direccion, total
        FROM
        (
        SELECT pedido_id, nombre, apellido , direccion, total, CONCAT(nombre_plato, ' X ',
        COUNT ( cantidad ))AS nombre_plato
        FROM pedidos
        JOIN pedidos_productos ON pedidos.id = pedidos_productos.pedido_id
        JOIN usuarios ON pedidos.usuario_id = usuarios.id
        JOIN productos ON pedidos_productos.producto_id = productos.id
        GROUP BY pedido_id, nombre_plato
        ) pedido
        WHERE pedido_id = ?
        GROUP BY pedido_id`,
        {
            replacements: [id],
            type: sequelize.QueryTypes.SELECT,
        }
    );
    return orders;
};

const getOrders = async () => {
    const orders = await sequelize.query(
        `SELECT pedido_id, status, GROUP_CONCAT(nombre_plato separator ', ') AS descripcion, nombre, apellido , direccion, total
            FROM
            (
            SELECT pedido_id, status, nombre, apellido ,direccion, total, CONCAT(nombre_plato, ' X ',
            COUNT ( cantidad ))AS nombre_plato
            FROM pedidos
            JOIN pedidos_productos ON pedidos.id = pedidos_productos.pedido_id
            JOIN usuarios ON pedidos.usuario_id = usuarios.id
            JOIN productos ON pedidos_productos.producto_id = productos.id
            GROUP BY pedido_id, nombre_plato
            ) pedido
            GROUP BY pedido_id`,
        {
            type: sequelize.QueryTypes.SELECT,
        }
    );

    return orders
};

const updateOrderById = async (order, id) => {
    try {
        const productUpdated = await sequelize.query(
            'UPDATE pedidos SET status = ? WHERE id = ?',
            {
                replacements: [
                    order.status,
                    [id]
                ],
            });
    } catch (error) {
        'no se pudo actualizar el producto de la base de datos'
    };
};
const deleteOrderById = async (id) => {
    try {
        const orderDeleted = await sequelize.query(
            ' DELETE FROM pedidos_productos WHERE pedido_id = ?',
            {
                replacements: [id],
            })
        return orderDeleted;
    } catch (err) {
        'no se puede eliminar la orden de la base de datos'
    };
};

module.exports = { createOrder, deleteOrderById, updateOrderById, getOrdersById, getOrders }
