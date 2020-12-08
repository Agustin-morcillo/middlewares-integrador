const allFunctions = require("../helpers/allFunctions")

const cookieMiddleware = (req,res,next)=>{
    if(req.cookies.user && !req.session.logeo){
        const users = allFunctions.getAllUsers()
        const userToFind = users.find((user)=>user.id == req.cookies.user)
        req.session.logeo = userToFind;
    }
    return next()
}

module.exports=cookieMiddleware