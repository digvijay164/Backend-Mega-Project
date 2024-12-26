import mongoose from 'mongoose';
import {DB_NAME} from '../src/constants.js';

const connectDB = async ()=>{
    try{
        const connectionInstance = await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`);
        console.log(` database connected successfully ${connectionInstance.connection.host}`);
        
    }catch(err){
        console.log(`ERROR Connecting MongoDB : ${err}`);
        throw err
    }
}

export default connectDB



// const connectDB = async ()=>{
//     try{
//         const connectionInstance = await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`);
  
//         console.log(`DataBase connected successfully ${connectionInstance.connection.host}`);
        
//     }catch(error){5
//         console.error(`error addressed : ${error}`);
//         throw error;
//     }
// };0

// export default  connectDB;