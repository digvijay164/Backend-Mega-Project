const asyncHandller = (requestHandller) => {
  (req, res, next) => {
    Promise.resolve(requestHandller(req, res, next)).catch((err) => next());
  };
};

export { asyncHandller };

// const asyncHandller = (fn)=> async(req, res, next)=>{
//     try {
//         await fn(req, res, next)
//     } catch (error) {
//         res.status(err.code || 500).json({
//             success: false,
//             message: err.message
//         })
//     }
// }
