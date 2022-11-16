const {Categories, Progress} = require('../models');
const BusinessError = require('../utils/BusinessError');

const getAllCategories = async(req, res, next)=>{
    try {
        const data = await Categories.findAll();
        res.status(201).send({status: "OK", data});
    } catch (error) {
        next(error)
    }
}
const getOneCategories = async(req, res,next)=>{
    const { id } = req.params;
    try {
        if (!id) {
            throw new BusinessError('Datos obligatorios', 401);
        }
        const data = await Categories.findByPk(id);
        res.status(201).send({data: data });
    } catch (error) {
        next(error)
    }
}
const createOneCategories = async (req, res, next) => {
    const { name, progressId } = req.body; 

    try {
        if(!name ) throw new BusinessError('Datos obligatorios', 401);
        const categoriaData = await Categories.findOne({
            where:{
                name: name
            }
        })
        if(categoriaData && categoriaData.datavalues.name === name){
            throw new BusinessError('la categoria ya existe', 402);
        }
        if(progressId){
            const data = await Categories.create({
                name, progressId
            });
            res.status(201).send({status: "OK", data: data });
        }else{
            const data = await Categories.create({
                name
            });
            res.status(201).send({status: "OK", data: data });
        }
        
    } catch (error) {
        next(error)
    }
}
const updateOneCategories = async(req, res, next)=>{
    const { id } = req.params;
    const {name} = req.body;
    try {
        if(!name ) throw new BusinessError('Datos obligatorios', 401);
        const data = await Categories.update({
            name: name
        }, {
        where: {
            id: id
        }});
        res.status(201).send({status: "OK", data });
    } catch (error) {
        next(error)
    }
}
const deleteOneCategories = async(req, res, next)=>{
    const { id } = req.params;
    try {
        if(!id) throw new BusinessError('seleccione un id', 401);

        const data = await Categories.findOne({
            where: {
                name: id
            },
            include: [{
                model: Progress
              },]
        })
        if(data.dataValues.progress){
        data.dataValues.progress.map( (e) => {
            Progress.destroy({
                where: { id: e.id }
            })
        })
        }

        const result = await Categories.destroy({
             where: { name: id }
            });
        res.status(200).send({status: 200, data: id});

    } catch (error) {
        next(error)
    }
}

module.exports = {
    getAllCategories,
    getOneCategories,
    createOneCategories,
    updateOneCategories,
    deleteOneCategories
}