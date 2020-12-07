const authMiddleware = (req,res,next)=>{
    if(req.session.logeo){
        next()
    }
    return res.redirect("/user/login")
}

module.exports=authMiddleware