const express = require('express'); //de esta forma se importa en node

require('dotenv').config();
const { dbConection } = require('./config/database');
const cors = require('cors');

//Creando el servidor express
const app = express();

//Configuracion de CORS
app.use(cors());

//Lectura y parseo del body
app.use(express.json());

//Conexion a la BD
dbConection();

//console.log(process.env);



app.use('/api/login', require('./routes/auth.routes'));

app.use('/api/alumno', require('./routes/alumno.routes'));
app.use('/api/apoderado', require('./routes/apoderado.routes'));
app.use('/api/evidencia', require('./routes/evidencia.routes'));
app.use('/api/ficha', require('./routes/ficha.routes'));
app.use('/api/incidente', require('./routes/incidente.routes'));
app.use('/api/ocupacion', require('./routes/ocupacion.routes'));
app.use('/api/tipo-apoderado', require('./routes/tipoApoderado.routes'));
app.use('/api/usuarios', require('./routes/usuario.routes'));

//Rutas de la API
/**
 * 
app.use('/api/usuarios', require('./routes/usuarios.routes'));
app.use('/api/proyectos', require('./routes/proyectos.routes'));
app.use('/api/investigadores', require('./routes/investigadores.routes'));
app.use('/api/login', require('./routes/auth.routes'));
app.use('/api/todo', require('./routes/busquedas.routes'));
app.use('/api/uploads', require('./routes/uploads.routes'));
 * 
 */

//Para levantar el servidor
app.listen(process.env.PORT, () => {
    console.log('Servidor corriendo en el puerto ' + process.env.PORT)
})



/*

git remote add origin https://github.com/W0iS35/PracticaMongoDB.git
git branch -M master
git push -u origin master

*/