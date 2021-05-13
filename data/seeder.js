const House = require('../models/houseModel');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const fs = require('fs');
dotenv.config({path:'../config.env'});

mongoose.connect(process.env.MONGODB_URL)
.then(() => console.log('connected successfully'))
.catch(err => {
    console.log(err);
})

const importHouses = async () => {
    try {
        const house_data = JSON.parse(fs.readFileSync('./house.json'));
        await House.create(house_data);
        console.log('imported data successfully')
    } catch (err) {
        console.log('unable to import data bcs',err);
    }
    process.exit();
}

const deleteAllHouses = async () => {
    try {
        
        await House.deleteMany({});
        console.log('deleted all the  data successfully')
    } catch (err) {
        console.log('unable to import data bcs',err);
    }
    process.exit();
}


if(process.argv[2] === '--import'){
    console.log('hello');
    importHouses();
}

if(process.argv[2] === '--delete'){
    deleteAllHouses();
}
