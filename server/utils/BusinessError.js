module.exports = class BusinessError extends Error {
    constructor(error, statusCode) {
        super(error);
        this.statusCode = statusCode;
    }
};