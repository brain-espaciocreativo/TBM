const {Users} = require('../models');
const hash = require('object-hash');

const getAllUser = async(req, res)=>{
    try {
        const data = await Users.findAll();
        res.status(201).send({status: "OK", data});
    } catch (error) {
        throw Error(res.status(500).send({status: 500, data: "No hay ningun usuarios"}));
    }
}
const getOneUser = async(req, res)=>{
    const { id } = req.params;
    try {
        const data = await Users.findByPk(id);
        res.status(201).send({data: data });
    } catch (error) {
        throw Error(res.status(500).send({status: 500, data: "No se encontró usuario con ese ID"}));
    }
}
const createOneUser = async (req, res) => {
    try {
        const {name, surname, email,password ,phone, role} = req.body; 
        const hashPass = hash.MD5(password);
        if(!name || !surname || !email || !password || !role || !phone) throw Error(res.status(402).send({status:402, data: "Datos obligatorios"}));
        const data = await Users.create({
            name:name,
            surname:surname,
            email:email,
            password: hashPass,
            phone:phone,
            role:role
        })
        res.status(201).send({status: "OK", data: data });
    } catch (error) {
        throw Error(res.status(500).send({status: 500, data:"No se creo usuario, verifique los datos"}));
    }
}
const updateOneUser =  async(req, res)=>{
    const { id } = req.params;
    const {name, surname, role, phone, email, password} = req.body;
    try {
        if(!name || !surname || !email || !password || !role || !phone) throw Error(res.status(402).send({status:402, data: "Datos obligatorios"}));
        const data = await Users.update({
            name: name,
            surname: surname,
            email: email,
            phone: phone,
            password: password,
            role: role
        }, {
        where: {
            id: id
        }});
        res.status(201).send({status: "OK", data });
    } catch (error) {
        throw Error(res.status(500).send({status: 500, data: "No se puede actualizar usuario, revisar datos"}));
    }
} 
const deleteOneUser = async(req, res)=>{
    const { id } = req.params;
    try {
        await Users.destroy({ where: { id: id }});
        res.status(204).send("Se elimino correctamente");
    } catch (error) {
        throw Error(res.status(500).send({status: 500, data: "No se eliminó correctamente"}));
    }
}

module.exports = {
    getAllUser,
    getOneUser,
    createOneUser,
    updateOneUser,
    deleteOneUser
}