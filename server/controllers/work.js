const {Works, News, Progress} =  require('../models');

const getAllWork = async(req, res)=>{
    try {
        const data = await Works.findAll({
            include: [
                {
                  model: News
                },
                {
                  model: Progress
                }]
        });
        res.status(201).send({status: "OK", data});
    } catch (error) {
        throw Error(res.status(500).send({status:500, data:"no se encontró trabajos"}));
    }
}
const getOneWork = async(req, res)=>{
    const { id } = req.params;
    try {
        const data = await Works.findByPk(id);
        res.status(201).send({data: data });
    } catch (error) {
        throw Error(res.status(500).send({status:500, data:"no se encontró trabajos con ese ID"}));
    }
}
const createOneWork = async(req, res)=>{
    const { name, description, userId } = req.body;
    try {
        if(!name || !description ) throw Error(res.status(402).send({status:402, data: "Datos obligatorios"}));
        if(userId) {
            const data = await Works.create({
                name, description, userId
            });
            res.status(201).send({status: "OK", data: data });
        }else{
            const data = await Works.create({
                name, description
            });
            res.status(201).send({status: "OK", data: data });
        }
        
    } catch (error) {
        console.log(error);
        throw Error(res.status(500).send({status:500, data:"no se creo ningun trabajo"}));
    }
}
const updateOneWork = async(req, res)=>{
    const { id } = req.params;
    const { name, novedades, userId } = req.body;
try {
    if(!name || !novedades ) throw Error(res.status(402).send({status:402, data: "Datos obligatorios"}));
        const data = await Works.update({
            name:name,
            novedades:novedades,
            userId: userId
        }, {
            where: {
                id: id
            }
        });
        res.status(201).send({status: "OK", data });
    } catch (error) {
        throw Error(res.status(500).send({status:500, data:"no se actualizó ningun trabajo"}));
    }
}
const deleteOneWork = async(req, res)=>{
    const { id } = req.params;
    try {
        await Works.destroy({ where: { id: id }});
        res.status(204).send("Se elimino correctamente");
    } catch (error) {
        throw Error(res.status(500).send({status:500, data:"no se elimino correctamente"}));
    }
}

module.exports = {
    getAllWork,
    getOneWork,
    createOneWork,
    updateOneWork,
    deleteOneWork
}