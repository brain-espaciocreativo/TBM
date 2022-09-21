const {News, Progress} = require('../models/index'); 

const getAllNews = async(req, res)=>{
    try {
        const data = await News.findAll({
            include: {
                model: Progress
              }
            });
        res.status(201).send({status: "OK", data});
    } catch (error) {
        throw Error(res.status(500).send({status:500, data:"no se encontró novedades"}));
    }
}
const getOneNews = async(req, res)=>{
    const { id } = req.params;
    try {
        const data = await News.findByPk(id);
        res.status(201).send({data: data });;
    } catch (error) {
        throw Error(res.status(500).send({status:500, data:"no se encontró novedades con ese ID"}));
    }
}
const createOneNews = async (req, res) => {
    const { name, description, video, date, workId} = req.body; 
    try {
        if( !name || !description || !date  ) throw Error(res.status(402).send({status:402, data: "Datos obligatorios"}));
        if(workId){
            const data = await News.create({
                name, description, video, date, workId
            });
            res.status(201).send({status: "OK", data: data });
        }else{
            const data = await News.create({
                name, description,video,workId, date
            });
            res.status(201).send({status: "OK", data: data });
        }
        
    } catch (error) {
        console.log(error)
        throw Error(res.status(500).send({status:500, data:"no se creo ninguna novedad"}));
    }
}
const updateOneNews = async(req, res)=>{
    const { id } = req.params;
    const { name, description, video, date, workId } = req.body;
    
    try {
        if(!description || !video || !workId || !date  ) throw Error(res.status(402).send({status:402, data: "Datos obligatorios"}));
        const data = await News.update({
            name: name,
            description:description,
            video:video,
            date:date,
            workId:workId,
        }, {
        where: {
            id: id
        }});
        res.status(201).send({status: "OK", data });
    } catch (error) {
        throw Error(res.status(500).send({status:500, data:"no se encontró actualizó ninguna novedad"}));
    }
}
const deleteOneNews = async(req, res)=>{
    const { id } = req.params;
    try {
        if(!id) throw Error(res.status(402).send("Seleccione un ID"));
        await News.destroy({ where: { id: id }});
        res.status(204).send("Se elimino correctamente");
    } catch (error) {
        throw Error(res.status(500).send({status:500, data:"no se elimino nunguna novedad"}));
    }
}

module.exports = {
    getAllNews,
    getOneNews,
    createOneNews,
    updateOneNews,
    deleteOneNews
}