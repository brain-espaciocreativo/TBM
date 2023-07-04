const { Works, News, Progress, Categories, Users } = require('../models');
const { create: createProgress } = require('../controllers/progress');
const BusinessError = require('../utils/BusinessError');
const { Op } = require('sequelize');

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
                    model: Users,
                    attributes: { exclude: ["password"] }
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
                },
                where: {
                    weight: {
                        [Op.not]: null
                    }
                }
            },
            {
                model: Users,
                attributes: ['email']
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

        const users = await Users.findAll({
            where: {
                id: usersIds
            }
        });

        const createdWork = await Works.create({
            name: work.name,
            description: work.description,
        });

        createdWork.addUsers(users);

        if (progresses && progresses.length > 0) {
            const createdProgresses = await Promise.all(
                progresses.map(progress => createProgress(progress, createdWork.dataValues.id))
            );

            res.status(201).send({ status: "OK", data: { ...createdWork.dataValues, processes: createdProgresses } });
        } else {
            res.status(201).send({ status: "OK", data: createdWork });
        }

    } catch (error) {
        console.log(error)
        next(error)
    }
};

const update = async (req, res, next) => {
    const { id } = req.params;
    const { name, description, usersIds } = req.body;

    try {
        if (!name || !description) throw new BusinessError('Datos obligatorios', 401);
        data = await Works.findOne({
            where: {
                id: id
            }
        });

        if (data.users) {
            data.users.map(u => data.removeUser(u))
        }

        const users = await Users.findAll({
            where: {
                id: usersIds
            }
        });

        await Works.update({
            name: name,
            description: description,
        }, {
            where: {
                id: id
            }
        });


        data.addUsers(users);

        res.status(201).send({ status: "OK", data });
    } catch (error) {
        console.log(error)
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