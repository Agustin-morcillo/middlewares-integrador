const sessionMiddleware = (req,res,next)=>{
    res.locals.infoLogeo = false
    if(req.session.logeo){
        res.locals.infoLogeo = req.session.logeo
    }
    return next()
}

module.exports=sessionMiddleware;