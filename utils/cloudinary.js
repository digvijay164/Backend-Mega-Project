import { v2 as cloudinary } from "cloudinary";
import fs from 'fs';
   // Configuration
   cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET 
});

const uploadCloudinary = async (localFilePath)=>{
    try{
        if(!localFilePath) return null;

        // Upload file on cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        })
        // File has been uploaded successfully
        console.log(`file has been uploaded successfully ${response.url}`);
        
        return response;
        
    }catch(err){
        fs.unlinkSync(localFilePath) // remove the locally saved file as the upload operation got failed
        console.log(`file upload failed ERROR : ${err}`);
        return null;
    } 
};

export {uploadCloudinary};