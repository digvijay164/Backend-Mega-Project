import dotenv from 'dotenv';
import connectDB from '../db/db.js';
dotenv.config(
    {
        path: './env'
    }
);
connectDB();







``








// import {DB_NAME} from '../src/constants.js';
// import mongoose from 'mongoose';
// import express from 'express';
// const app = express();

// ( async ()=>{
//     try{
//        await mongoose.connect(`${process.env.DB_CONNECT}/${DB_NAME}`);
//         app.on('error', (error)=>{
//             console.log(`error addressed : ${error}`);
//             throw error;
//         });
//         app.listen(process.env.PORT, ()=>{
//             console.log(`Server is running on PORT : ${process.env.PORT}`);
//         });
//     }catch(error){
//         console.log(`error addressed : ${error}`);
//         throw error;
//     }
// } )()