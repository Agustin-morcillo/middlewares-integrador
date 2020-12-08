const authMiddleware = (req,res,next)=>{
    if(req.session.logeo){
       return next()
    }
    return res.redirect("/user/login")
}

module.exports=authMiddleware