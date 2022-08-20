const {Progress} = require('../models');

let progressController= {
    all: async(req, res)=>{
        try {
            const result = await Progress.findAll();
            res.send(result);
        } catch (error) {
            console.log(error);
        }
    },
    showId: async(req, res)=>{
        const { id } = req.params;
        
        try {
            const result = await Progress.findByPk(id);
            res.send(result);
        } catch (error) {
            console.log(error);
        }
    },
    create: (req, res) => {
        const {workId,categoriesId,value} = req.body; 
        try {
            if(!workId || !categoriesId || !value ) throw Error(res.status(402).send("Datos obligatorios"));
            const result = Progress.create({
                workId, categoriesId, value
            });
            console.log('este es el body', req.body);
            res.send(result);
        } catch (error) {
            console.log(error);
        }
    },
    edit:async(req, res)=>{
        const { id } = req.params;
        const {workId, categoriesId, value} = req.body;
        try {
            if(!workId || !categoriesId || !value ) throw Error(res.status(402).send("Datos obligatorios"));
            const result = await Progress.update({
                workId: workId,
                categoriesId: categoriesId,
                value: value
            }, {
            where: {
                id: id
            }});
            res.send(result);
        } catch (error) {
            console.log(error);
        }
    },
    delete:async(req, res)=>{
        const { id } = req.params;
        try {
            const result = await Progress.destroy({ where: { id: id }});
            res.status(204).send("Se elimino correctamente");
        } catch (error) {
            console.log(error);
        }
    }
}
module.exports = progressController;