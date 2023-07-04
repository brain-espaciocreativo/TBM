const { Op } = require('sequelize');
const { Progress, Categories } = require('../models');
const BusinessError = require('../utils/BusinessError');

const getByWorkId = async (workId) => {
    try {
        const data = await Progress.findAll({
            include: {
                model: Categories,
            },
            where: {
                workId: workId
            }
        });
        res.status(201).send({ status: "OK", data });
    } catch (error) {
        next(error)
    }
};

const getByWorkIdAndWeight = async (workId) => {
    try {
        const data = await Progress.findAll({
            include: {
                model: Categories,
            },
            where: {
                workId: workId,
                weight: {
                    [Op.not]: null
                }
            }
        });
        res.status(201).send({ status: "OK", data });
    } catch (error) {
        next(error)
    }
};

const getByNewsId = async (newsId) => {
    try {
        const data = await Progress.findAll({
            include: {
                model: Categories,
            },
            where: {
                newsId: newsId
            }
        });
        res.status(201).send({ status: "OK", data });
    } catch (error) {
        next(error)
    }
};

const create = async (progress, workId) => {
    const { value, categoryId, weight } = progress;
    if (!value || !categoryId || !workId || !weight) throw new BusinessError('Datos obligatorios', 401);

    const data = await Progress.create({
        value,
        categoryId,
        workId,
        weight
    });

    return data;
};

const createWithNewsId = async (progress, workId, newsId) => {
    const { value, categoryId } = progress;
    if (!value || !categoryId || !workId ) throw new BusinessError('Datos obligatorios', 401);

    const data = await Progress.create({
        value,
        categoryId,
        workId,
        newsId
    });

    return data;
}

const destroy = async (id) => {
    try {
        if (!id) throw new BusinessError('Datos obligatorios', 401);
        await Progress.destroy({ where: { id: id } });
        res.status(204).send("Se elimino correctamente");
    } catch (error) {
        next(error)
    }
}

const destroyWithNewId = async (id) => {
    if (!id) throw new BusinessError('Datos obligatorios', 401);
    await Progress.destroy({ where: { newsId: id } });
}

module.exports = {
    getByWorkId,
    getByWorkIdAndWeight,
    getByNewsId,
    create,
    destroy,
    destroyWithNewId,
    createWithNewsId
}