const express = require('express');
const morgan = require('morgan');
const path = require('path');
const mysql = require('mysql');
const myConnection = require("express-myconnection");

const app = express();

// RUTAS IMPORTADAS
const customerRoutes = require('./routes/customer');
const { urlencoded } = require('express');

// CONFIGURACION
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// MIDDLEWARES
app.use(morgan('dev'));
app.use(myConnection(mysql, {
    host: 'localhost',  // Local Host, este todos lo tenemos igual
    user: '',           // El usuario de la base de datos
    password: '',       // Contraseña de ese usuario
    port: 3306,         // Puerto, puedes cambiarlo si así lo establece tu conexión
    database: ''        // Nombre de la base de datos
}, 'single'));
app.use(express.urlencoded({extended: false}));

// RUTAS
app.use('/', customerRoutes);

// ARCHIVOS ESTATICOS
app.use(express.static(path.join(__dirname, 'public')));

// INICIANDO SERVER
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
});
