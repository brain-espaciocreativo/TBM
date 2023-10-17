module.exports = errorHandling = (err, req, res, next) => {
    if (err.statusCode) {
        res.status(err.statusCode).send(err.message);
        return;
    }

    res.status(500).send(err.message);
}