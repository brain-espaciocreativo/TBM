const {Works} =  require('../models');

let WorkControllers= {
    all:async(req, res)=>{
        try {
            const result = await Works.findAll();
            res.send(result);
        } catch (error) {
            console.log(error);
        }
    },
    showId:async(req, res)=>{
        const { id } = req.params;
        try {
            const result = await Works.findByPk(id);
            res.send(result);
        } catch (error) {
            console.log(error);
        }
    },
    create:async(req, res)=>{
        const { name, novedades, progress } = req.body;
        try {
            if(!name || !novedades || !progress ) throw Error(res.status(402).send("Datos obligatorios"));
            const result = await Works.create({
                name,novedades,progress
            });
            res.send(result);
        } catch (error) {
            console.log(error);
        }
    },
    edit:async(req, res)=>{
        const { id } = req.params;
        const { name, novedades, progress } = req.body;
    try {
        if(!name || !novedades || !progress ) throw Error(res.status(402).send("Datos obligatorios"));
            const result = await Works.update({
                name:name,
                novedades:novedades,
                progress:progress
            }, {
                where: {
                    id: id
                }
            });
            res.send(result);
        } catch (error) {
            console.log(error);
        }
    },
    delete:async(req, res)=>{
        const { id } = req.params;
        try {
            const result = await Works.destroy({ where: { id: id }});
            res.status(204).send("Se elimino correctamente");
        } catch (error) {
            console.log(error);
        }
    }
}
module.exports = WorkControllers;