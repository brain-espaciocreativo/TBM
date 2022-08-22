const { Router } = require('express');
const router = Router();
const Work = require('../models/Work')

router.get('/', async(req, res)=>{
    try {
        const result = await Work.findAll();
        res.send(result);
    } catch (error) {
        console.log(error);
    }
})

router.get('/:id', async(req, res)=>{

    const { id } = req.params;

    try {

        const result = await Work.findByPk(id);
        res.send(result);

    } catch (error) {
        console.log(error);
    }
});

router.post('/', async(req, res)=>{
    const { name, novedades, progress } = req.body;
    try {
        const result = await Work.create({
            name: name,novedades,progress
        });
        res.send(result);
    } catch (error) {
        console.log(error);
    }
});

router.put('/:id', async(req, res)=>{

    const { id } = req.params;
    const { name, novedades, progress } = req.body;

    try {
        const result = await Work.update({
            name,
            novedades,
            progress
        }, {
            where: {
                id: id
            }
        });
        res.send(result);
    } catch (error) {
        console.log(error);
    }
});

router.delete('/:id', async(req, res)=>{
    
    const { id } = req.params;

    try {
        
        const result = await Work.destroy({ where: { id: id }});

        res.status(204).send("Se elimino correctamente");

    } catch (error) {
        console.log(error);
    }
});

module.exports = router;