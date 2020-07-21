DELILHA RESTO

Este projecto esta realizado en Node.JS  y base de datos con MySQL.

La base de datos ya esta conectada a Heroku donde se encuentra alojada para realizar las pruebas.

Si se quiere realizar de manera local

##Para iniciar el servidor##
Abir la terminal y colocar node server.js

##Configuración DataBase## 
1) Crear una base de datos local que se llame "Delilah_Resto".
2) Importar el archivo con el modelo de las tablas SQL que se llama "database".
3) En el archivo config.js posee todos los valores para conectarse con la base de datos alojada en Heroku. 



##Pasos para instalar el configurar el servidor##
1) Ejecutar en el comando en la terminal : npm run server



##Cambiar contraseña de JWT##
1) Dentro de la carpeta api/JWT, en el archivo JWTconfig.js modificar el valor de la constante "sign" por su palabra segura. 
Ej: sign = 'aqui su contraseña segura'


##Modelos de usuarios, pedidos, login y productos##
Modelos de objetos para realizar las consultas en Postman 
se encuentran en el archivo "objects".
