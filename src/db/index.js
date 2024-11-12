// require('dotenv').config({path: './env'});
// import dotenv from 'dotenv';
import mongoose from "mongoose";
import DB_NAME from '../constants.js';

const connectDB = async ()=>{
    try{
     const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`);
     console.log(`DB connected successfully !! DB Host : ${connectionInstance.connection.host}`);
     
    } catch(error){
        console.error(`MONGODB CONNECTION fAILED : ${error}`)
        process.exit(1)
    }
}
export default connectDB