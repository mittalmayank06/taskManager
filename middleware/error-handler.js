const errorHandlerMiddleware = (err,req,res,next) =>{  //POST req. with incomplete data
    console.log(err);
    return res.status(err.status).json({msg: err.message});

}
module.exports = errorHandlerMiddleware;