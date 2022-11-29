const {News, Progress} = require('../models/index'); 
const BusinessError = require('../utils/BusinessError');


const getAllNews = async(req, res, next)=>{
    try {
        const data = await News.findAll({
            include: {
                model: Progress
              }
            });
            
            const hostUrl = req.protocol + '://' + req.get('host');

        const result = data.map( (n)=>{
            n.video = hostUrl + '/'+ n.video;
            return n;
        } )
        res.status(201).send({status: "OK", result});
    } catch (error) {
        next(error)
    }
}
const getOneNews = async(req, res, next)=>{
    const { id } = req.params;
    try {
        const data = await News.findByPk(id);
        const hostUrl = req.protocol + '://' + req.get('host');

        const result = data.map( (n)=>{
            n.video = hostUrl + '/'+ n.video;
            return n;
        } )

        res.status(201).send({data: result });;
    } catch (error) {
        next(error)
    }
}
const createOneNews = async (req, res, next) => {

    const { name, description, video, workId} = req.query; 

    try {
        if( !name || !description ) throw new BusinessError("Datos obligatorios", 401);
        if(req.file === null) throw new BusinessError("No existe archivo para subir", 401);

        if(workId){
            const data = await News.create({
                name,
                description,
                video, 
                workId
            });
            res.status(201).send({status: "OK", data: data });
        }else{
            const data = await News.create({
                name,
                description,
                video 
            });
            res.status(201).send({status: "OK", data: data });
        }
    } catch (error) {
        next(error)
    }
}
const updateOneNews = async(req, res, next)=>{
    const { id } = req.params;
    const { name, description, video, date, workId } = req.body;
    
    try {
        if(!description || !video || !workId || !date  ) throw new BusinessError("Datos obligatorios", 402);
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
        next(error)
    }
}
const deleteOneNews = async(req, res, next)=>{
    const { id } = req.params;
    try {
        if(!id) throw new BusinessError("Seleccione un ID", 401);
        const data = await News.findOne({ where: {id: id}})
        await News.destroy({ where: { id: id }});
        res.status(200).send({status: 200, data: data});
    } catch (error) {
        next(error)
    }
}

module.exports = {
    getAllNews,
    getOneNews,
    createOneNews,
    updateOneNews,
    deleteOneNews
}