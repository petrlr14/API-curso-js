/* ESTO ES UN MODULOOOOOOOOOOO */
/* aqui se va a configurar express y bodyparse */
'use strict';
let express=require('express');
let bodyparse=require('body-parser');

let app=express();

/* cargar archivos de rutas */
let project_routes=require('./routes/project');
/* middlewares */
app.use(bodyparse.urlencoded({extended:false}));/* configurcion necesaria */
app.use(bodyparse.json());

/* cors para cuando se trabaje con front end que tenga diferente origen al api */

app.use((req, response, next) => {
    response.header('Access-Control-Allow-Origin', '*');/* aqui va el origen permitido */
    response.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    response.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    response.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

/* routing */
app.use('/'/* si se quiere sobreescribir la ruta  */, project_routes);

/* esportandolo */
module.exports=app;/* importo app que ya tiene las configuraciones */