const {News} = require('../models/index'); 

let newsControllers = {
    all: async(req, res)=>{
        try {
            const result = await News.findAll();
            res.send(result);
        } catch (error) {
            console.log(error);
        }
    },
    showId: async(req, res)=>{
        const { id } = req.params;
        
        try {
            const result = await News.findByPk(id);
            res.send(result);
        } catch (error) {
            console.log(error);
        }
    },
    create:  (req, res) => {
        const { description,video, workId,categoriesId,date} = req.body; 
        try {
            if(!description || !video || !workId || !categoriesId || !date  ) throw Error(res.status(402).send("Datos obligatorios"));
            const result = News.create({
                description,video,workId,categoriesId,date
            });
            console.log('este es el body', req.body);
            res.send(result);
        } catch (error) {
            console.log(error);
        }
    },
    edit:async(req, res)=>{
        const { id } = req.params;
        const {description,video,date,workId,categoriesId} = req.body;
        
        try {
            if(!description || !video || !workId || !categoriesId || !date  ) throw Error(res.status(402).send("Datos obligatorios"));
            const result = await News.update({
                description:description,
                video:video,
                workId:workId,
                categoriesId:categoriesId,
                date:date,
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
            
            const result = await News.destroy({ where: { id: id }});
            res.status(204).send("Se elimino correctamente");
        } catch (error) {
            console.log(error)
        }
    }
}
module.exports= newsControllers;