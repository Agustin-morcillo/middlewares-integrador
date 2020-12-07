const allFunctions = require("../helpers/allFunctions")

const cookieMiddleware = (req,res,next)=>{
    if(req.cookies.user && !req.session.logeo){
        const users = allFunctions.getAllUsers()
        const userToFind = users.find((user)=>user.email == req.cookies.user)
        req.session.logeo = userToFind;
    }
    return next()
}

module.exports=cookieMiddleware