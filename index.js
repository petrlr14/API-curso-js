'use strict';
let mongoose = require('mongoose');/* se carga el modulo mongoose y se guarda en un variable */
let app=require('./app');/* se importa el modulo, el js no se pone */
let port=3700;/* el puerto del servidor */
mongoose.Promise = global.Promise;/* le digo que es una promesa */
mongoose.connect('mongodb://localhost:27017/portafolio', {useNewUrlParser:true})/* le paso como parametro la url de mi base , el segundo parametro es para que no tire warning, y en un futuro sera obligatorio*/
    .then(() => {
        console.log('se conecto bien chidori');
        /* creacion del servidor */
        app.listen(port,()=>{
            console.log('servidor corriendo bien chidori');
        });
    }).catch(err=>{/* capturo caulquier error que pueda suceder */
        console.log(err)
    }); 