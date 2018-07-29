/* ESTO ES UN MODULOOOOOOOOOOO */
/* aqui se va a configurar express y bodyparse */
'use strict';
let express=require('express');
let bodyparse=require('body-parser');

let app=express();

/* cargar archivos de rutas */

/* middlewares */
app.use(bodyparse.urlencoded({extended:false}));/* configurcion necesaria */
app.use(bodyparse.json());

/* cors */

/* routing */
app.get('/test', (request, response)=>{/* request:lo que manda el cliente, response mi respuesta */
    response.status(200).send({
        message:'se recibio bien chidori'
    });/* este es el json que devuelve la peticion, aqui es donde se maneja bien chidori las rutas que se ingresan */
});
/* esportandolo */
module.exports=app;/* importo app que ya tiene las configuraciones */