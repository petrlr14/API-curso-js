/* aqui se configuran los middlewares tambien */
'use strict';

let express = require('express');
let multipart=require('connect-multiparty');
let multipartMiddelware=multipart({uploadDir:'./uploads'});

let ProjectController = require('../controllers/project');

let router = express.Router();
/* aqui le doy la ruta a las funciones */
router.get('/projects', ProjectController.getProjects);
router.post('/save-project', ProjectController.saveProject);
router.post('/project/:id'/* se puede poner :id? para que sea opcional */, ProjectController.getProject);
/* si se desea usar un middleware se pasa como segundo parametro */
router.post('/upload-image/:id', multipartMiddelware ,ProjectController.uploadImage);
router.put('/project/:id', ProjectController.updateProject);
router.delete('/remove/:id', ProjectController.deleteProject);
module.exports = router;