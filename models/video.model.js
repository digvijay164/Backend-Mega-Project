import mongoose, {Schema} from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";
const videoSchema = Schema(
    {
        videofile:{
            type: String,
            require: true // Cloudinary url
        },
        thumbnail:{
            type: String,
            require: true // Cloudinery url
        },
        title:{
            type: String,
            require: true
        },
        discription:{
            type: String,
            require: true
        },
        discription:{
            type: String,
            require: true
        },
        duration:{
            type: Number,
            require: true
        },
        views:{
            type: Number,
            default: 0
        },
        ispublish:{
            type: Boolean,
            default:true 
        },
        owner:{
            type: Schema.Types.ObjectId,
            ref: "User"
        }
    },
    {
        timestamps: true
    }
);

videoSchema.plugin(mongooseAggregatePaginate);

export const Video = mongoose.model("Video", videoSchema);