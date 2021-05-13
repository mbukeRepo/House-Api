const express = require('express');
const houseRouter = require('./routes/housesRouter');
const authRouter = require('./routes/authRoutes');
const AppError = require('./utils/AppError');
const errorHandler = require('./controllers/errorController');
const path = require('path');
const app = express();

// body parsers 

// 1 . application/json
    app.use(express.json());
// serving static files
    app.use('/house-images/',express.static(path.join(__dirname,'public','houses')));

// router handlers
    app.use('/api/v1/houses',houseRouter);
    app.use('/api/v1/auth',authRouter);
    app.all('*',(req,res,next) => {
        next(new AppError("this page does not exist",404));
    });
    app.use(errorHandler);
module.exports = app;