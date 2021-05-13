const dotenv = require('dotenv');
dotenv.config({path:'./config.env'});
const app = require('./app');
const connectDb = require('./utils/connectDB');

// connecting to the database
connectDb();

const port =  process.env.PORT || 5000;
app.listen(port, () => console.log(`server started on port ${port}`));