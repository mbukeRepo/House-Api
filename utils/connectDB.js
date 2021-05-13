const mongoose = require('mongoose');

const connectDb = async () => {
    await mongoose.connect(process.env.MONGODB_URL,{
        
             useUnifiedTopology: true ,
             useNewUrlParser: true 
    });
    console.log('connected to the database ...');
}

module.exports = connectDb;