// require('dotenv').config({path: './.env'});
import dotenv from 'dotenv';
import mongoose from "mongoose";
import DB_NAME from "./constants.js"
import express from 'express';
import connectDB from './db/index.js';
import { app } from './app.js';
dotenv.config({
    path : "./env"
})
 connectDB()
 .then(()=>{
    const port = process.env.PORT;
    app.listen(port || 8000, ()=>{
        console.log(`Server is listening on PORT : ${port}`);
    });
 }).catch((err)=>{
    console.log(`MongoDB Connection Error : ${err}`);
 })











// const app = express();
    

// ( async ()=>{
//     try{
//        await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`);

//        app.on("error", (error)=>{
//         console.log("ERROR : ", error);
//        });

//        app.listen(process.env.PORT , ()=>{
//         console.log(`app is listening on port ${process.env.PORT}`);
        
//        })

//     } catch(error){
//         console.error("ERROR : ",error);
//     }
    
// } )()