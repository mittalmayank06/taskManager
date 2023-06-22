// Kind of middlware helps us to not write try & catch so many times.
// Like a fun(), it reuses our code of catch(block).

const asyncWrapper = (fn) =>{
    return async(req,res,next) =>{
        try{
            await fn(req,res,next);
        }
        catch(err) {
            next(err);  //handled by built-in express error handler middleware
        }
    }
}
module.exports = asyncWrapper;