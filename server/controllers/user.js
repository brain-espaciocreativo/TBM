const {Users} = require('../models');

let userController= {
    all: async(req, res)=>{
        try {
            const result = await Users.findAll();
            res.send(result);
        } catch (error) {
            console.log(error);
        }
    },
    showId: async(req, res)=>{
        const { id } = req.params;
        
        try {
            const result = await Users.findByPk(id);
            res.send(result);
        } catch (error) {
            console.log(error);
        }
    },
    create: (req, res) => {
        const {name, lastName, password, email, phone, role} = req.body; 
        try {
            if(!name || !lastName || !email || !password || !role) throw Error(res.status(402).send("Datos obligatorios"));
            const result = Users.create({
                name, lastName, password, email, phone, role
            });
            console.log('este es el body', req.body);
            res.send(result);
        } catch (error) {
            console.log(error);
        }
    },
    edit:async(req, res)=>{
        const { id } = req.params;
        const {name, lastName, role, phone, email, password} = req.body;
        try {
            if(!name || !lastName || !email || !password || !role) throw Error(res.status(402).send("Datos obligatorios"));
            const result = await Users.update({
                name: name,
                lastName: lastName,
                email: email,
                phone: phone,
                password: password,
                role: role
            }, {
            where: {
                id: id
            }});
            res.send(result);
        } catch (error) {
            console.log(error);
        }
    },
    delete:async(req, res)=>{
        const { id } = req.params;
        try {
            const result = await Users.destroy({ where: { id: id }});
            res.status(204).send("Se elimino correctamente");
        } catch (error) {
            console.log(error);
        }
    }
}
module.exports = userController;