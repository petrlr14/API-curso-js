'use strict';

let Project=require('../models/project');

/* aqui se crean los metodos para la entidad project */

let controller={
    home:function(request, response) {
        return response.status(200).send({
            message:'llego bien a home wey'
        });
    },
    test:function(request, response){
        return response.status(200).send({
            message:'llego bien a test wey'
        });
    },
    saveProject:function(request, response){
        let project=new Project();/* cuando se hace un new project se crea un id  */
        let params=request.body;
        project.name=params.name;
        project.description=params.description;
        project.category=params.category;
        project.langs=params.langs;
        project.year=params.year;
        project.img=null;
        /* con este metodo se guarda en la base de datos */
        project.save((error, projectStored)=>{/* project sotored es el proyecto que se acaba de guardar */
            if(error) return response.status(500).send({
                message:'ocurrio un error'
            });
            if(!projectStored) return response.status(404).send({
                message:'no se ha podido guardar el proyecto'
            });
            return response.status(200).send({
                project:projectStored
            });
        });
        return response.status(200).send({
            project:project
        })
    }
};
module.exports=controller;