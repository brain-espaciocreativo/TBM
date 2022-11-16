const {Works, News, Progress, Categories, Users} =  require('../models');
const BusinessError = require('../utils/BusinessError');

const getAllWork = async(req, res, next)=>{
    try {
        const data = await Works.findAll({
            include: [
                {
                  model: News
                },
                {
                  model: Progress,
                  include: {
                    model: Categories
                }
                },{
                    model: Users
                }]
        });
        res.status(201).send({status: "OK", data});
    } catch (error) {
        next(error)
    }
}
const getOneWork = async(req, res, next)=>{
    const { id } = req.params;
    try {
        if (!id) {
            throw new BusinessError('Datos obligatorios', 401);
        }
        const data = await Works.findOne({
            where:{
                id: id
            },
                include: [{
                  model: News
                },
                {
                    model: Progress,
                    include: {
                        model: Categories
                    }
                },{
                    model:Users
                }]
            
        });
        res.status(201).send({data: data });
    } catch (error) {
        next(error)
    }
}
const createOneWork = async(req, res, next)=>{
    const { work, ships, shipUsers } = req.body;

    try {
        if(!work.name || !work.description ) throw new BusinessError('Datos obligatorios', 401);

        if(ships){
            let workCreated = null;
            if(work.userId) {
                const data = await Works.create({
                    name: work.name,
                    description: work.description,
                    userId: work.userId
                });
                res.status(201).send({status: "OK", data: data });
            }else{
                workCreated = await Works.create({
                    name: work.name,
                    description: work.description
                });
                const currentWork = workCreated.get({ plain: true });

                ships.map( async (e) => {
                    const currentCategory = await Categories.findOne({
                    where:{
                        name: e.category
                    }
                    })
                    
                    const createdProgress = Progress.create({
                        value: `${e.progress.value}`,
                        height_value: `${e.progress.height_value}`,
                        work_progress: currentWork.id,
                        categoryId: currentCategory.dataValues.id
                    })

                    const categoria = Categories.create({
                        name: `${e.category.name}`,
                        progressId: 1
                    })
                })
                res.status(201).send({status: "OK", data: workCreated })


        if(shipUsers){
            const usersData = await shipUsers.map( async (e) =>{
                    const data = await Users.findOne({
                    where:{
                        email: e.email
                    }
                })
                workCreated.addUsers(data)
            })
        }
        }
    }      
    }catch (error) {
        next(error)
    }
}
const updateOneWork = async(req, res, next)=>{
    const { id } = req.params;
    const { name, description } = req.body.categoryData;

    const workData = req.body.categoryData;
    const oldProgress = req.body.categoryData.progresses;
    const newProgress = req.body.chip;
    

    try {
        if(!name || !description )throw new BusinessError('Datos obligatorios', 401);  
        newProgress.map( async (j) =>{
            let result = true;
                oldProgress.map( (e) => {
                    if(e.category.name === j.category){
                        result = false
                        Progress.update({
                            value: j.progress.value,
                            height_value: j.progress.height_value,
                        },{
                            where:{
                                id: e.id
                            }
                        })
                    }
                })

                if(result){
                    const newData  = await Categories.findOne({
                        where: {
                            name: j.category
                        }
                    })
                    Progress.create({
                        value: j.progress.value,
                        height_value: j.progress.height_value,
                        categoryId: newData.id,
                        work_progress: workData.id
                    })
                }
        })
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
        next(error)
    }
}
const deleteOneWork = async(req, res, next)=>{
    const { id } = req.params;
    try {
        const data = await Works.findOne({ where: { id: id }})
        await Works.destroy({ where: { id: id }});
        res.status(200).send({status: 200, data: data});
    } catch (error) {
        next(error)
    }
}
const getOneByName = async(req, res, next)=>{
    const { name } = req.params;
    try {
        const data = await Works.findOne({
            where:{
                name: name
            },
                include: [{
                  model: News
                },
                {
                    model: Progress,
                    include: {
                        model: Categories
                    }
                },{
                    model:Users
                }]
            
        });
        res.status(200).send({data: data });
    } catch (error) {
        next(error)
    }
}
module.exports = {
    getAllWork,
    getOneWork,
    createOneWork,
    updateOneWork,
    deleteOneWork,
    getOneByName
}