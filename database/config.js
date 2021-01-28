const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

//Connect to DB

const dbConnection = async() => {
    try{
        await mongoose.connect(process.env.DB_CONNECT, 
            {
                useNewUrlParser: true, 
                useUnifiedTopology: true,
                useCreateIndex: true
            }, ()=>{
            console.log('Db is connected');
        })
    }catch(error){
        console.log('Error in DB connection');
    }
}

module.exports = {
    dbConnection,
}

