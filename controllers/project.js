'use strict';

let Project = require('../models/project');
let fs=require('fs');
/* aqui se crean los metodos para la entidad project */

let controller = {
    saveProject: function (request, response) {
        let project = new Project();/* cuando se hace un new project se crea un id  */
        let params = request.body;
        project.name = params.name;
        project.description = params.description;
        project.category = params.category;
        project.langs = params.langs;
        project.year = params.year;
        project.img = null;
        /* con este metodo se guarda en la base de datos */
        project.save((error, projectStored) => {/* project sotored es el proyecto que se acaba de guardar */
            if (error) return response.status(500).send({
                message: 'ocurrio un error'
            });
            if (!projectStored) return response.status(404).send({
                message: 'no se ha podido guardar el proyecto'
            });
            return response.status(201).send({
                project: projectStored
            });
        });

    },
    getProject: function (request, response) {
        let projectID = request.params.id;
        Project.findById(projectID, (error, project) => {/* es un metodo de mongoose */
            if (error) return response.status(500).send({
                error: error.name,
                message: 'hubo un error'
            });
            if (!project) return response.status(404).send({
                message: 'no se encontró el projecto'
            });
            return response.status(200).send({
                project: project
            });
        });
    },
    getProjects: function (request, response) {
        /* se usa {algo:algun-parametro} si se quiere buscar segun algo, es como un where */
        /* existe el metodo sort('parametro a sortear') luego de find. Con un -oarametro se de mayor a menor */
        Project.find({}).exec((error, projects) => {
            if (error) return response.status(500).send({
                error: error.name,
                message: 'hubo un error'
            });
            if (!projects) return response.status(404).send({
                message: 'no hay projectos'
            });
            return response.status(200).send({
                projects: projects
            });
        });
    },
    updateProject: function (request, response) {
        let projectID = request.params.id;
        let updated = request.body;
        /* metodo para buscar y actualizar el proyecto buscado */
        /* si se ejecuta el callback encontro el proyecto */
        /* con {new:true} te regresa directamnete el objeto actualizado */
        Project.findByIdAndUpdate(projectID, updated, { new: true }, (error, project) => {
            if (error) return response.status(500).send({ message: 'ocurrio un error' });
            if (!project) return response.status(404).send({ message: 'no se encontró el proyecto' });
            return response.status(200).send({
                project
            });
        });
    },
    deleteProject: function (request, response) {
        let projectID = request.params.id;
        Project.findByIdAndRemove(projectID, (error, projectRemoved) => {
            if (error) return response.status(500).send({ message: 'ocurrio un error' });
            if (!projectRemoved) return response.status(404).send({ message: 'no se encontro el proyecto' });
            return response.status(200).send({ projectRemoved });
        })
    },
    uploadImage: function (request, response) {
        let projectID = request.params.id;
        let aceptedExtension = ['jpg', 'png', 'jpeg'];
        if (request.files) {
            /* del archivo, saco lo que se mando en el campo image y saco el path */
            let filePath = request.files.image.path;
            let fileSplit = filePath.split('\\');
            let fileName = fileSplit[1];
            let extension = fileName.split('\.')[1];
            if (aceptedExtension.indexOf(extension) > -1) {
                Project.findByIdAndUpdate(projectID, { img: fileName }, (error, projectUpdated) => {
                    if (error) return response.status(500).send({ message: 'error' });
                    if (!projectUpdated) return response.status(404).send({ message: 'proyecto no encontrado' });
                    if(projectUpdated.img&&fs.existsSync('uploads/'+projectUpdated.img)){
                        fs.unlink('uploads/'+projectUpdated.img, error=>{
                            if(error) return response.status(500).send({message:'error interno'});
                        });
                    }
                    projectUpdated.img=fileName;
                    return response.status(200).send({ project: projectUpdated });
                });
            } else {
                /* fs.unlink borra archivos */
                fs.unlink(filePath, error=>{
                    return response.status(400).send({ message: 'error en formato' });
                });
            }

        } else {
            return response.status(500).send({ message: 'hubo un error' });
        }
    }
};
module.exports = controller;