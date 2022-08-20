const {Categories} = require('../models');

let categoriasCOntrollers= {
    all: async(req, res)=>{
        try {
            const result = await Categories.findAll();
            res.send(result);
        } catch (error) {
            console.log(error);
        }
    },
    showId: async(req, res)=>{
        const { id } = req.params;
        
        try {
            const result = await Categories.findByPk(id);
            res.send(result);
        } catch (error) {
            console.log(error);
        }
    },
    create:  (req, res) => {
        const {name} = req.body; 
        try {
            if(!name ) throw Error(res.status(402).send("Datos obligatorios"));
            const result = Categories.create({
                name
            });
            console.log('este es el body', req.body);
            res.send(result);
        } catch (error) {
            console.log(error);
        }
    },
    edit:async(req, res)=>{
        const { id } = req.params;
        const {name} = req.body;
        try {
            if(!name ) throw Error(res.status(402).send("Datos obligatorios"));
            const result = await Categories.update({
                name: name
            }, {
            where: {
                id: id
            }});
            res.send(result);
        } catch (error) {
            console.log(error);
        }
    },
    delete: async(req, res)=>{
        const { id } = req.params;
        try {
            
            const result = await Categories.destroy({ where: { id: id }});
            res.status(204).send("Se elimino correctamente");
        } catch (error) {
            console.log(error)
        }
    }
}
module.exports= categoriasCOntrollers;