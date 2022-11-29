const {Progress, Works, Categories, News} = require('../models');
const BusinessError = require('../utils/BusinessError');

const getAllProgress = async(req, res, next)=>{
    try {
        const data = await Progress.findAll({
            include: 
                {
                  model: Categories
                }
            });
        res.status(201).send({status: "OK", data});
    } catch (error) {
        next(error)
    }
}
const getOnePorgress = async(req, res, next)=>{
    const { id } = req.params;
    try {
        if (!id) {
            throw new BusinessError('Datos obligatorios', 401);
        }
        const data = await Progress.findByPk(id);
        res.status(201).send({data: data });
    } catch (error) {
        next(error)
    }
}
const createOneProgress = async (req, res, next) => {
    const { value, work_progress, newsId } = req.body; 
    try {
        if( !value ) throw new BusinessError('Datos obligatorios', 401);
        
        if(newsId && work_progress){
            const data = await Progress.create({
                value, work_progress, newsId
            });
            res.status(201).send({status: "OK", data: data });
        }
        else if(work_progress){
            const data = await Progress.create({
                value, work_progress
            });
            res.status(201).send({status: "OK", data: data });
        }else if(newsId){
            const data = await Progress.create({
                value, newsId
            });
            res.status(201).send({status: "OK", data: data });
        }else{
            const data = await Progress.create({
                value
            });
            res.status(201).send({status: "OK", data: data });
        }
        
    } catch (error) {
        next(error)
    }
}
const updateOneProgress = async(req, res, next)=>{
    const { id } = req.params;
    const { value, workId, work_progress } = req.body;
    try {
        if(!workId || !categoriesId || !value ) throw new BusinessError('Datos obligatorios', 401);
        const data = await Progress.update({
            value: value,
            workId: workId,
            work_progress: work_progress
        }, {
        where: {
            id: id
        }});
        res.status(201).send({status: "OK", data });
    } catch (error) {
        next(error)
    }
}
const deleteOneProgress = async(req, res, next)=>{
    const { id } = req.params;
    try {
        if(!id) throw new BusinessError('Datos obligatorios', 401);
        await Progress.destroy({ where: { id: id }});
        res.status(204).send("Se elimino correctamente");
    } catch (error) {
        next(error)
    }
}

module.exports = {
    getAllProgress,
    getOnePorgress,
    createOneProgress,
    updateOneProgress,
    deleteOneProgress
}