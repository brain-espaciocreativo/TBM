const {Works, News, Progress, Categories} =  require('../models');

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
    const { work, ships } = req.body;
    console.log(req.body);
    try {
        if(!work.name || !work.description ) throw Error(res.status(402).send({status:402, data: "Datos obligatorios"}));
        if(ships){
            if(work.userId) {
                const data = await Works.create({
                    name: work.name,
                    description: work.description,
                    userId: work.userId
                });
                res.status(201).send({status: "OK", data: data });
            }else{
                const workCreated = await Works.create({
                    name: work.name,
                    description: work.description
                });
                const currentWork = workCreated.get({ plain: true });
                ships.map(e=> {
                    const createdProgress = Progress.create({
                        value: `${e.progress.value}`,
                        height_value: `${e.progress.height_value}`,
                        work_progress: currentWork.id,
                        categoryId: e.category.id
                    });
                    // const currentProgress = createdProgress.get({ plain: true });
                    const categoria = Categories.create({
                        name: `${e.category.name}`,
                        progressId: 1
                    })
                });
                res.status(201).send({status: "OK", data: workCreated });
            }
        }else{
            if(work.userId) {
                const data = await Works.create({
                    name: work.name,
                    description: work.description,
                    userId: work.userId
                });
                res.status(201).send({status: "OK", data: data });
            }else{
                const data = await Works.create({
                    name: work.name,
                    description: work.description
                });
                res.status(201).send({status: "OK", data: data });
            }}
        
    } catch (error) {
        console.log(error);
        throw Error(res.status(500).send({status:500, data:"no se creo ningun trabajo"}));
    }
}
const updateOneWork = async(req, res)=>{
    const { id } = req.params;
    const { name, description  } = req.body;
try {
    if(!name || !description ){
        
        res.status(402).send({status:402, data: "Datos obligatorios"});
        return;
    } 
        const data = await Works.update({
            name:name,
            description:description
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