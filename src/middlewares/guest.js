const guestMiddleware = (req,res,next)=>{
    if(!req.session.logeo){
        return next()
    }
    return res.redirect("/")
}

module.exports=guestMiddleware