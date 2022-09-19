const {Progress, Works, Categories, News} = require('../models');

const getAllProgress = async(req, res)=>{
    try {
        const data = await Progress.findAll({
            include: 
                {
                  model: Categories
                }
            });
        res.status(201).send({status: "OK", data});
    } catch (error) {
        throw Error(res.status(500).send({status:500, data:"no se encontró progresos"}));
    }
}
const getOnePorgress = async(req, res)=>{
    const { id } = req.params;
    try {
        const data = await Progress.findByPk(id);
        res.status(201).send({data: data });
    } catch (error) {
        throw Error(res.status(500).send({status:500, data:"no se encontró progreso con ese ID"}));
    }
}
const createOneProgress = async (req, res) => {
    const {workId,categoriesId,value} = req.body; 
    try {
        if(!workId || !categoriesId || !value ) throw Error(res.status(402).send({status:402, data: "Datos obligatorios"}));
        const data = await Progress.create({
            workId, categoriesId, value
        });
        console.log('este es el body', req.body);
        res.status(201).send({status: "OK", data: data });
    } catch (error) {
        throw Error(res.status(500).send({status:500, data:"no se creo ningun progreso"}));
    }
}
const updateOneProgress = async(req, res)=>{
    const { id } = req.params;
    const {workId, categoriesId, value} = req.body;
    try {
        if(!workId || !categoriesId || !value ) throw Error(res.status(402).send({status:402, data: "Datos obligatorios"}));
        const data = await Progress.update({
            workId: workId,
            categoriesId: categoriesId,
            value: value
        }, {
        where: {
            id: id
        }});
        res.status(201).send({status: "OK", data });
    } catch (error) {
        throw Error(res.status(500).send({status:500, data:"no se actualizó ningun progreso"}));
    }
}
const deleteOneProgress = async(req, res)=>{
    const { id } = req.params;
    try {
        if(!id) throw Error(res.status(402).send("Seleccione un ID"));
        await Progress.destroy({ where: { id: id }});
        res.status(204).send("Se elimino correctamente");
    } catch (error) {
        throw Error(res.status(500).send({status:500, data:"no se eliminó correctamente"}));
    }
}

module.exports = {
    getAllProgress,
    getOnePorgress,
    createOneProgress,
    updateOneProgress,
    deleteOneProgress
}