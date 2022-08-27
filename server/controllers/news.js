const {News} = require('../models/index'); 

const getAllNews = async(req, res)=>{
    try {
        const data = await News.findAll();
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
    const { description,video, workId,categoriesId,date} = req.body; 
    try {
        if(!description || !video || !workId || !categoriesId || !date  ) throw Error(res.status(402).send({status:402, data: "Datos obligatorios"}));
        const data = await News.create({
            description,video,workId,categoriesId,date
        });
        res.status(201).send({status: "OK", data: data });
    } catch (error) {
        throw Error(res.status(500).send({status:500, data:"no se creo ninguna novedad"}));
    }
}
const updateOneNews = async(req, res)=>{
    const { id } = req.params;
    const {description,video,date,workId,categoriesId} = req.body;
    
    try {
        if(!description || !video || !workId || !categoriesId || !date  ) throw Error(res.status(402).send({status:402, data: "Datos obligatorios"}));
        const data = await News.update({
            description:description,
            video:video,
            workId:workId,
            categoriesId:categoriesId,
            date:date,
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