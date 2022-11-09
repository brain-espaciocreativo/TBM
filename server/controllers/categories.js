const {Categories, Progress} = require('../models');

const getAllCategories = async(req, res)=>{
    try {
        const data = await Categories.findAll();
        res.status(201).send({status: "OK", data});
    } catch (error) {
        throw Error(res.status(500).send({status: 500, data: "No se encontró ninguna categoria"}));
    }
}
const getOneCategories = async(req, res)=>{
    const { id } = req.params;
    try {
        const data = await Categories.findByPk(id);
        res.status(201).send({data: data });
    } catch (error) {
        throw Error(res.status(500).send({status: 500, data:"no se encontró ninguna categoria con ese ID"}));
    }
}
const createOneCategories = async (req, res) => {
    const { name, progressId } = req.body; 

    console.log(req.body)

    try {
        if(!name ) throw Error(res.status(402).send({status:402, data: "Datos obligatorios"}));
        const categoriaData = await Categories.findOne({
            where:{
                name: name
            }
        })
        console.log(categoriaData);
        if(categoriaData && categoriaData.datavalues.name === name){
            throw Error(res.status(402).send({status:402, data:"la categoria ya existe"}))
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
        
        throw Error(res.status(500).send({status: 500, data:"No se creo categoria"}));
    }
}
const updateOneCategories = async(req, res)=>{
    const { id } = req.params;
    const {name} = req.body;
    try {
        if(!name ) throw Error(res.status(402).send({status:402, data: "Datos obligatorios"}));
        const data = await Categories.update({
            name: name
        }, {
        where: {
            id: id
        }});
        res.status(201).send({status: "OK", data });
    } catch (error) {
        throw Error(res.status(500).send("No se actualizó ninguna categoria"));
    }
}
const deleteOneCategories = async(req, res)=>{
    const { id } = req.params;
    
    try {
        if(!id) throw Error(res.status(402).send("Seleccione un ID"));

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

        console.log('esto es result',result);

        res.status(200).send({status: 200, data: id});

    } catch (error) {
            console.log(error)
    }
}

module.exports = {
    getAllCategories,
    getOneCategories,
    createOneCategories,
    updateOneCategories,
    deleteOneCategories
}