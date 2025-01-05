import dotenv from 'dotenv';
import connectDB from '../db/db.js';
import app from './app.js';
dotenv.config(
    {
        path: './.env'
    }
);
connectDB()
 .then(()=>{
    const PORT = process.env.PORT
    app.listen(PORT || 8000, ()=>{
        console.log(`Server is running on PORT : ${PORT}`);
    }); 
    app.on('error', (err)=>{
        console.log(`Error Addressed : ${err}`);
        throw err;
    })
})
.catch((err)=>{
    console.log(`MongoDB Connection Error !! : ${err} `);
});








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