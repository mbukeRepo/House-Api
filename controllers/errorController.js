const AppError = require('../utils/AppError');

const handleValidationError = (err) => {
    let fields = Object.values(err.errors).map(err => err.message) ;
    let message = `${fields.join(', ')}`;
    return new AppError(message,400)
}
const handleCastError = (err) => {
    let message = `Invalid ${err.path} : ${err.value}`
    return new AppError(message,400);
}
const handleDuplicationError = err => {
    let value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];
    let message = `Duplicate ${value} please use another email`;
    return new AppError(message,400);
}
const handleExpiredJWT = () => new AppError("Token has expired, please login again",401);
const handleInvalidToken = () => new AppError("Invalid Token ....",401);

const sendErrorDev = (err,res) => {
    return res.status(err.statusCode).json({
        status:err.status,
        name:err.name,
        message:err.message,
        error:err
    });
}
const sendErrorProd = (err,res) => {
    if(err.isOperational){
        return res.status(err.statusCode).json({
            status:err.status,
            message:err.message
        })
    }else{
        console.log("Error:" , err);
        return res.status(500).json({
            status:'error',
            message:"something went very wrong"
        });
    }
}

module.exports = (err,req,res,next) => {
    err.statusCode = err.statusCode ? err.statusCode : 500;
    err.status = err.status || 'error'

    if(process.env.NODE_ENV ==='development'){
        sendErrorDev(err,res);
    }
    if(process.env.NODE_ENV === 'production'){
        let error = {...err};
        error.message = err.message;
        if(err.name === "ValidationError"){
            error = handleValidationError(err);
        }
        if(err.name === "CastError"){
            error = handleCastError(err);
        }
        if(err.code === 11000){
            error = handleDuplicationError(err);
        }
        if(err.name === "TokenExpiredError"){
            error = handleExpiredJWT();
        }
        if(err.name === "JsonWebTokenError"){
            error = handleInvalidToken();
        }
        sendErrorProd(error,res);
    }
}