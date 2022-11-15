const BusinessError = require('./BusinessError');

module.exports = errorHandling = (err, req, res, next) => {
    console.log(err.statusCode);

    if (err.statusCode) {
        res.status(err.statusCode).send(err.message);
        return;
    }

    res.status(500).send(err.message);
}