const catchAsync = require('../utils/catchAsync');
const House = require('../models/houseModel');
const APIFeatures = require('../utils/apiFeatures');
const AppError = require('../utils/AppError');
exports.getAllHouses = catchAsync(async (req,res,next) => {
    // fetch all houses
    const features = new APIFeatures(House.find(),req.query).filter().limitFields().paginate();
    const houses = await features.query;
    // send the houses
    res.status(200).json({
        status:"success",
        results:houses.length,
        data:{
            houses
        }
    });
});  

exports.getSingleHouse = catchAsync( async (req,res,next) => {
    // fetch the post by id
    const house = await House.findById(req.params.id);
    console.log(house);
    if (!house){
        return next(new AppError("this house is not found",404));
    }
    // send it to the client
    res.status(200).json({
        status:"success",
        data:{
            house
        }
    });
});

exports.createNewHouse = catchAsync(async (req,res,next) => {

    // create new house 
    const house = await House.create(req.body);
    // send it to the client
    res.status(201).json({
        status:"success",
        data:{
            house
        }
    })
} ); 

exports.deleteHouse = catchAsync( async  (req,res,next) => {
    // delete house
    const deletedHOuse = await House.findByIdAndDelete(req.params.id);
    if(!deletedHOuse){
        return next(new AppError("this house is not found",404));
    }
    // send a success message to the client
    res.status(204).json({
        status:"success",
        data:null
    })
}); 

exports.updateHouse = catchAsync( async (req,res,next) => {
    // update house
    const updatedHouse = await House.findByIdAndUpdate(req.params.id,req.body,{
        runValidators:true,
        new:true
    })

    if(!updatedHouse){
        return next(new AppError("this house is not found",404));
    }
    //send the updated house to the client
    res.status(200).json({
        status:"success",
        data:{
            house:updatedHouse
        }
    });
} ); 