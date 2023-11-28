const asyncHandler = (requestHandler)=>{
    return  (req,res,next)=>{
        Promise.resolve(requestHandler(req,res,next)).catch((err)=>{
            //res.status(err.statusCode).json(err.message)
            next(err);
        });
    }
}

// const asyncHandler = (fn) => async(request,response,next)=>{
//      try{
//         await fn(request,response,next);
//      }
//      catch(err){
//         response.statuts(400).json({success:false,"message":err.message});
//      }
// };


export {asyncHandler}