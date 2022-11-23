const {News, Progress} = require('../models/index'); 


const getAllNews = async(req, res)=>{

    const pageAsNumber = Number.parseInt(req.query.page);
    const sizeAsSize = Number.parseInt(req.query.size);

    
    try {
        let page = 0;
    
        if(!Number.isNaN(pageAsNumber) &&  pageAsNumber > 0){
            page = pageAsNumber
        }
    
        let size = 10;
        if(!Number.isNaN(sizeAsSize) && sizeAsSize > 10 && sizeAsSize < 0 ){
            size = sizeAsSize
        }
        
        const data = await News.findAll(
            {
                limit: size,
                offset: page * size
            },
            {
            include: {
                model: Progress
            }
            }
        )


        const hostUrl = req.protocol + '://' + req.get('host');

        const result = data.map( (n)=>{
            n.video = hostUrl + '/'+ n.video;
            return n;
        })
            
        res.status(201).send({status: "OK", result});
    } catch (error) {
        console.log(error)
    }
}
const getOneNews = async(req, res)=>{
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
        throw Error(res.status(500).send({status:500, data:"no se encontró novedades con ese ID"}));
    }
}
const createOneNews = async (req, res) => {

    const { name, description, video, workId} = req.query; 


    console.log('---> esto es el body', req.query)
    console.log('-------------------------------');
    console.log('---> esto es el file', req.file)

    try {

        if( !name || !description ) res.status(402).send({status:402, data: "Datos obligatorios"});

        if(req.file === null) res.status(402).send({status:402, data: "No existe archivo para subir"})

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
        console.log(error)
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
        const data = await News.findOne({ where: {id: id}})
        await News.destroy({ where: { id: id }});
        res.status(200).send({status: 200, data: data});
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