const sequelize = require('../database/db');

module.exports = {
    createUser: async (user) => {
        const createsUser = await sequelize.query(
            "INSERT INTO usuarios (usuario, nombre,apellido, email, telefono, direccion, password) VALUES (?, ?, ?, ?, ?,? ,? )",
            {
                replacements: [
                    user.usuario,
                    user.nombre,
                    user.apellido,
                    user.email,
                    user.telefono,
                    user.direccion,
                    user.password
                ],
            })
        return createsUser
    },

    getUsers: async () => {
        const users = await sequelize.query('SELECT * FROM usuarios',
            { type: sequelize.QueryTypes.SELECT }
        );
        return users
    },

    getUserByUser: async (user) => {
        const userById = await sequelize.query('SELECT usuario, nombre, apellido, direccion, telefono, email FROM usuarios WHERE usuario = ?',
            { replacements: [user], type: sequelize.QueryTypes.SELECT }
        );
        return userById
    },

    updateUserById: async (user,id) => {
        try {

            const userUpdated = await sequelize.query(
                'UPDATE usuarios SET email = ? ,telefono = ? ,direccion = ? WHERE usuario = ?',
                {
                    replacements: [
                        user.usuario,
                        user.nombre,
                        user.apellido,
                        user.email,
                        user.telefono,
                        user.direccion,
                        user.password,
                        user.isActive,
                        user.isAdmin,
                        [id]
                    ],
                });
            return userUpdated
        } catch (error) {
            'no se pudo actualizar el usuario de la base de datos'
        }
    },

    deleteUserById: async (id) => {
        try {
            const userDeleted = await sequelize.query(
                ' DELETE FROM usuarios WHERE id = ?',
                {
                    replacements: [id],
                })
            return userDeleted;
        } catch (err) {
            res.send('no se puede eliminar el usuario de la base de datos');
        };
    }
}
