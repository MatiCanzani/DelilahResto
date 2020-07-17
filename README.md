DELILHA RESTO

Este projecto esta realizado en Node.JS  y base de datos con MySQL.

##Configuración DataBase## 
1) Crear una base de datos local que se llame "Delilah_Resto".
2) Importar el archivo con el modelo de las tablas SQL que se llama "database".
3) En el archivo config.js posee todos los valores para conectarse con su base de datos. 

Valores por defecto: 

username : 'root',
password : 'root',
dataBase : 'Delilah_Resto',
host: 'localhost',
port : '8889',



##Pasos para instalar el configurar el servidor##
1) Ejecutar en el comando en la terminal : npm run server



##Cambiar contraseña de JWT##
1) Dentro de la carpeta JWT, en el archivo JWTconfig.js modificar el valor de la constante "sign" por su palabra segura. 
Ej: sign = 'aqui su contraseña segura'




##Modelos de usuarios, pedidos, login y productos##
Los modelos para realizar peticiones a la API se encuentran en el archivo "objects".
