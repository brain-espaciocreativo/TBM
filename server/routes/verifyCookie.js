// const authSessionRouter = require("./authSession");

const verifyCookie = (req, res, next)=>{
    const { cookies } = req;

    console.log(cookies);

    console.log('//////////////////////////paso por aqui///////////////////////')

    if(!cookies.sessionId) return res.sendStatus(401);
    const userSession = sessions.find(e => e.sessionId === cookies.sessionId);

    if(!userSession) return res.sendStatus(401);

    const user = USERS_BBDD.find(e => e.guid === userSession.guid);

    if(!user) return res.sendStatus(401);

    delete user.password;

    return next();

}

module.exports = verifyCookie;