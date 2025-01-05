// Using promises methods
// const asyncHandller = (requestHandller)=>{
//     (req,res,next)=>{
//         Promise.resolve(requestHandller(req,res,next)).catch((err) => next(err));
//     } 
// }


// using standard try catch method
const asyncHandler = (fn)=> async (req, res, next)=>{
     try{
        await fn(req,res,next)
     }catch(err){
        res.status(500).json({
            success: false,
            message: err.message
        })
     }
};

export  {asyncHandler};