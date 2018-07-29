'use strict';

let express = require('express');

let ProjectController = require('../controllers/project');

let router = express.Router();
/* aqui le doy la ruta a las funciones */
router.get('/home', ProjectController.home);
router.post('/test', ProjectController.test);
router.post('/save-project', ProjectController.saveProject);

module.exports = router;