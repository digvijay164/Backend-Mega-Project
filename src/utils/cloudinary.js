import { v2 as cloudinary } from 'cloudinary';
import { response } from 'express';
import fs from 'fs'
import { url } from 'inspector';

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env,CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET 
});

const uploadOnCloudinary = async(localFilePath)=>{
    try {
        if(!localFilePath) return null
        // upload the file on cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        }) 
        // file has been uploaded successfully
        .console.log(`file has been uploaded successfully :  ${response.url}`);
        return response
        
    } catch (error) {
        fs.unlinkSync(localFilePath) // Remove the locally saved temporary files as the uploading operation got failed       
    
        return null
    }
}

// cloudinary.v2.uploader.upload(
//     "https://upload.wikimedia.org/wikipedia/commons/a/ae/Olympic_flag.jpg",
//     { public_id: "olympic_flag" },
//     function(error, result) { console.log(result); }
// );
