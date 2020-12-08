const {validationResult} = require("express-validator")
const allFunctions = require("../helpers/allFunctions")
const bcrypt = require("bcryptjs")
const { use } = require("../app")


module.exports = {
    showRegister: (req, res) => {
        res.render("user/user-register-form")
    },
    processRegister: (req, res) => {
        const errors = validationResult(req);

        if(!errors.isEmpty()){
            return res.render("user/user-register-form",{errors:errors.errors,oldEmail:req.body.email})
        }

        const newUser = {
            id: allFunctions.newUserId(),
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password,10),
            avatar: req.files[0].filename
        }
        allFunctions.writeUsers(newUser)
        return res.redirect("/user/login")

    },
    showLogin: (req, res) => {
        res.render("user/user-login-form")
    },
    processLogin: (req, res) => {
        const errors = validationResult(req);

        if(!errors.isEmpty()){
            return res.render("user/user-login-form",{errors:errors.errors,oldEmail:req.body.email})
        }
        const users = allFunctions.getAllUsers()
        const userToFind = users.find((user)=>user.email==req.body.email)
        req.session.logeo = userToFind;

        if(req.body.remember){
           res.cookie("user",userToFind.id,{ maxAge: 1000 * 60 * 60 * 24 * 365 })
        }

        return res.redirect("/")

    },
    showProfile: (req, res) => {
        return res.render('user/profile');
    },
    logout: (req, res) => {
       
         res.clearCookie("user")
        
        req.session.destroy();
        return res.redirect("/");
    }

}