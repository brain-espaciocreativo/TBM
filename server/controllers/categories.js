const {Categories, Progress} = require('../models');
const BusinessError = require('../utils/BusinessError');

const getAll = async(req, res, next)=>{
    try {
        const data = await Categories.findAll();
        res.status(201).send({status: "OK", data});
    } catch (error) {
        next(error)
    }
};

const get = async(req, res,next)=>{
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
};

const create = async (req, res, next) => {
    const { name } = req.body;

    try {
        if(!name ) throw new BusinessError('Datos obligatorios', 401);

        const categoriaData = await Categories.findOne({
            where:{
                name: name
            }
        });

        if(categoriaData){
            throw new BusinessError('la categoria ya existe', 402);
        }

        const data = await Categories.create({
            name
        });
        
        res.status(201).send({status: "OK", data: data });
    } catch (error) {
        next(error)
    }
};

module.exports = {
    getAll,
    get,
    create
}