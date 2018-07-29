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

/* cors */

/* routing */
app.use('/'/* si se quiere sobreescribir la ruta  */, project_routes);

/* esportandolo */
module.exports=app;/* importo app que ya tiene las configuraciones */