const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');
const User  = require("../models/userModel");
const jwt = require("jsonwebtoken");
const {promisify} = require("util")

const  signToken = id => {
    return jwt.sign({userId :id },process.env.JWT_SECRET,{expiresIn:process.env.JWT_EXPIRES});
}
exports.login = catchAsync(async (req,res,next) =>{
    const {email,password} = req.body;
    // check if the email and password are provided
    if(!email || !password){
        return next(new AppError("email and password required",400));
    }
    const user = await User.findOne({email});
    // check if user exist and if password is correct
    if(!user || !(await user.checkPassword(password,user.password)) ){
        return next(new AppError("incorrect email or password",400));
    }
    const token = signToken(user._id);
    res.status(200).json({
        status:"success",
        token
    });
});

exports.signup = catchAsync(async (req,res,next) => {
    // create new user and automatically sign in 
    const user = await User.create(req.body);
    const token = signToken(user._id);
    res.status(201).json({
        status:"success",
        token,
        data:{
            user
        }
    });
});

exports.protect = catchAsync(async (req,res,next) => {
    let token;
    // check if token is defined 
    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        token = req.headers.authorization.split(' ')[1];
    }
    if(!token){
        return next(new AppError("you are not logged in ",401));
    }
    // verify if the token is valid
    const decoded = await promisify(jwt.verify)(token,process.env.JWT_SECRET);
    // check if user still exists
    const currentUser = await User.findById(decoded.userId);
    if(!currentUser){
        return next(new AppError("user does not exist  for this email",401));
    }
    // check if user has changed password
    if(currentUser.changedPasswordAfter(decoded.iat)){
        return next(new AppError("password has been changed please re-login",401));
    }
    req.user = currentUser;
    // append user to req
    next();
});

exports.restrictedTo = (...roles) => {
    return (req,res,next) => {
        if(!roles.includes(req.user.role)){
            return next(new AppError("you are not allowed to make this request",401));
        }
        next();
    }
}