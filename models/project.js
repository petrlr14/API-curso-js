'use strict';
let mongoose = require('mongoose');
let Schema = mongoose.Schema;/* objeto para poder crear esquemas */

let ProjectSchema = Schema({
    name: String,
    description: String,
    category: String,
    langs: String,
    year: Number,
    img:String
});

module.exports = mongoose.model('Project', ProjectSchema);
/* lo que hace mongoose es hace un lowercase y pluraliza al nombre de la entidad 
    si exite--->guarda en la coleccion
*/