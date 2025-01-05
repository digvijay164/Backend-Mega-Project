import { Schema } from "mongoose";
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt  from "jsonwebtoken";

const userSchema = mongoose.Schema(
    {
        username:{
            type: String,
            require: true,
            unique:true,
            lowercase: true,
            trim: true,
            index: true
        },
        email:{
            type: String,
            require: true,
            unique:true,
            lowercase: true,
            trim: true,
        },
        fullname:{
            type: String,
            require: true,
            trim: true,
            index: true
        },
        avatar:{
            type: String, //Cloudinary url
            require: true,
        },
        coverimage:{
            type: String
        },
        watchhistory: [
             {
                type: Schema.Types.ObjectId,
                Ref: 'video '
             }
        ],
        password:{
            type: String,
            require: [true, 'Password is required']
        },
        refreshtoken:{
            type: String,
        }
    },
    {
        timestamps: true
    }
);
// WE DO NOT USE ARROW FUNCTION BECAUSE IT DOESN'T TAKE ANY CONTEXT ALSO, AERO FUNCTION CAN'T TAKE REFERENCE OF [this], THEREFORE, IF YOU WANT TO MANIPULATE THE USER SCHEMA, THEN WE HAVE TO USE STANDARD FUNCTION METHOD
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 10); // Remove quotes from the saltRounds number
    next();
});

userSchema.isPasswordCorrect = async function(password){
    await bcrypt.compare(password, this.password)
};
userSchema.methods.generateAccessToken = function(){
    jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username,
            fuollname: this.fullname
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
};

userSchema.methods.generateRefreshToken = function(){
    jwt.sign(
        {
            _id: this._id
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
};


 export const User = mongoose.model("User", userSchema);