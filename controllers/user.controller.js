import {asyncHandler} from '../utils/asyncHandller.js';
import {ApiError} from '../utils/apiError.js';
import {User} from '../models/user.model.js';
import {uploadCloudinary} from '../utils/cloudinary.js';
import {ApiResponse} from '../utils/apiResponse.js'

const registerUser = asyncHandler( async (req,res)=>{
    // res.status(200).json({
    //     message: "OK working"
    // })
    // console.log('Files:', req.files); // Log uploaded files
    // console.log('Body:', req.body);   // Log form data


    const {username, fullname, email, password} = req.body;
    console.log(` Full name : ${fullname} \n Username : ${username} \n email : ${email} \n Password : ${password}`);
    
    if(username === "") throw new ApiError(400,"user name is required");
    if(fullname === "") throw new ApiError(400,"user name is required");
    if(password === "") throw new ApiError(400,"user name is required");
    if(email === "") throw new ApiError(400,"user name is required");

    const existedUser = await User.findOne({
        $or: [ {username},{email} ]
    });

    if(existedUser) throw new ApiError(409, `user with ${username} and ${email} allready exist`);

    // ? Is used for to check is it optional or not
    const avatarLocalPath = req.files?.avatar[0]?.path;
    const coverImageLocalPath = req.files?.coverimage[0]?.path;

    if(!avatarLocalPath) throw new ApiError(400, "Avatar file is required");

    const avatar = await uploadCloudinary(avatarLocalPath);
    const coverImage = await uploadCloudinary(coverImageLocalPath);

    if(!avatar) throw new ApiError(400, "Avatar file is required");
    
    const user = await User.create(
        {
            fullname,
            avatar: avatar.url || "",
            coverimage: coverImage.url || "",
            email,
            password,
            username: username.toLowerCase()
        }
    );

    const createdUser = await User.findById(user._id).select(
        "-password -refreshtoken"
    );

    if(!createdUser) throw new ApiError(500, "something went wrong while registering the user");
     
    return res.status(201).json(
       new ApiResponse(200, createdUser, "user registered successfully") 
    )
    

} );

export default registerUser;