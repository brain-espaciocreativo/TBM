const { News } = require('../models/index');
const { progressController: progress } = require('../controllers');
const BusinessError = require('../utils/BusinessError');


const getAll = async (req, res, next) => {
    try {
        const data = await News.findAll({
            include: {
                model: Progress
            }
        });

        res.status(201).send({ status: "OK", data });
    } catch (error) {
        next(error)
    }
}

const get = async (req, res, next) => {
    const { id } = req.params;
    try {
        const data = await News.findByPk(id);

        res.status(201).send({ data });;
    } catch (error) {
        next(error)
    }
}
const create = async (req, res, next) => {
    const { name, description, video, workId, progresses } = req.body;

    try {
        if (!name || !description || !workId) throw new BusinessError("Datos obligatorios", 401);

        const data = await News.create({
            name,
            description,
            video,
            workId
        });

        const createdProgress = [];

        if (progress) {
            createdProgress = await Promise.all(progresses.map(progress => progressController.create({ ...progress, newsId: data.id, workId })))
        }


        data.progresses = createdProgress;

        res.status(201).send({ status: "OK", data: data });
    } catch (error) {
        next(error)
    }
};

const update = async (req, res, next) => {
    const { id } = req.params;
    const { name, description, video } = req.body;

    try {
        if (!description || !video) throw new BusinessError("Datos obligatorios", 402);
        const data = await News.update({
            name: name,
            description: description,
            video: video,
        }, {
            where: {
                id: id
            }
        });
        res.status(201).send({ status: "OK", data });
    } catch (error) {
        next(error)
    }
};

const destroy = async (req, res, next) => {
    const { id } = req.params;
    try {
        if (!id) throw new BusinessError("Seleccione un ID", 401);
        const data = await News.findOne({ where: { id: id } });
        await progressController.destroyWithNewId(id);
        await News.destroy({ where: { id: id } });
        res.status(200).send({ status: 200, data: data });
    } catch (error) {
        next(error)
    }
};

module.exports = {
    getAll,
    get,
    create,
    update,
    destroy
}