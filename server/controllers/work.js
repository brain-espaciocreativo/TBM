const {Works, News, Progress, Categories, Users} =  require('../models');

const getAllWork = async(req, res)=>{
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
        throw Error(res.status(500).send({status:500, data:"no se encontró trabajos"}));
    }
}
const getOneWork = async(req, res)=>{
    const { id } = req.params;
    try {
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
        throw Error(res.status(500).send({status:500, data:"no se encontró trabajos con ese ID"}));
    }
}
const createOneWork = async(req, res)=>{
    const { work, ships, shipUsers } = req.body;

    try {
        if(!work.name || !work.description ) res.status(402).send({status:402, data: "Datos obligatorios"});

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
                res.status(201).send({status: "OK", data: workCreated })
                })


        if(shipUsers){
            const usersData = await shipUsers.map( async (e) =>{
                    const data = await Users.findOne({
                    where:{
                        email: e.email
                    }
                })
                workCreated.addUsers(data)
            })
            // res.status(201).send({status: "OK", data: data });
        }

        }
    }      
    }catch (error) {
        console.log(error);
    }
}

const updateOneWork = async(req, res)=>{
    const { id } = req.params;
    const { name, description } = req.body.categoryData;

    const workData = req.body.categoryData;
    const oldProgress = req.body.categoryData.progresses;
    const newProgress = req.body.chip;
    

try {
    
        if(!name || !description )return res.status(402).send({status:402, data: "Datos obligatorios"})  

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
        res.status(500).send({status:500, data:"no se actualizó ningun trabajo"});
    }
}
const deleteOneWork = async(req, res)=>{
    const { id } = req.params;
    try {
        const data = await Works.findOne({ where: { id: id }})
        await Works.destroy({ where: { id: id }});
        res.status(200).send({status: 200, data: data});
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