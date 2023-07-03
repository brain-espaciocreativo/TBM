const { Works, News, Progress, Categories, Users } = require('../models');
const { progressController: progress } = require('../controllers');
const BusinessError = require('../utils/BusinessError');

const getAll = async (req, res, next) => {
    try {
        const data = await Works.findAll({
            include: [
                {
                    model: Progress,
                    include: {
                        model: Categories
                    },
                },
                {
                    model: Users
                }]
        });
        res.status(201).send({ status: "OK", data });
    } catch (error) {
        next(error)
    }
};

const get = async (req, res, next) => {
    const { id } = req.params;
    try {
        if (!id) {
            throw new BusinessError('Datos obligatorios', 401);
        }
        const data = await Works.findOne({
            where: {
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
            },
            {
                model: Users
            }]

        });
        res.status(201).send({ data: data });
    } catch (error) {
        next(error)
    }
};

const create = async (req, res, next) => {
    const { work, progresses, usersIds } = req.body;

    try {
        if (!work.name || !work.description) throw new BusinessError('Datos obligatorios', 401);

        const createdWork = [];

        createdWork = await Works.create({
            name: work.name,
            description: work.description
        });

        const users = [];

        if (usersIds) {
            users = await Users.find({
                where: {
                    id: usersIds
                }
            });
        }

        createdWork = await Works.create({
            name: work.name,
            description: work.description,
            users
        });

        if (!progresses) {
            res.status(201).send({ status: "OK", data: createdWork });
        }

        const createdProgresses = await Promise.all(
            progresses.map(progress => progressController.create({ ...progress, workId: workCreated.id }))
        );

        res.status(201).send({ status: "OK", data: { ...createdWork, processes: createdProgresses } });
    } catch (error) {
        next(error)
    }
};

const update = async (req, res, next) => {
    const { id } = req.params;
    const { name, description, usersIds } = req.body;

    try {
        if (!name || !description) throw new BusinessError('Datos obligatorios', 401);
        const users = [];

        if(usersIds) {
            users = await Users.find({
                where:{
                    id: usersIds
                }
            });
        }
        const data = await Works.update({
            name: name,
            description: description,
            users,
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
        const data = await Works.findOne({ where: { id: id } })
        await Works.destroy({ where: { id: id } });
        res.status(200).send({ status: 200, data: data });
    } catch (error) {
        next(error)
    }
};

const getByName = async (req, res, next) => {
    const { name } = req.params;
    try {
        const data = await Works.findOne({
            where: {
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
            }, {
                model: Users
            }]

        });
        res.status(200).send({ data: data });
    } catch (error) {
        next(error)
    }
};

module.exports = {
    getAll,
    get,
    create,
    update,
    destroy,
    getByName
}