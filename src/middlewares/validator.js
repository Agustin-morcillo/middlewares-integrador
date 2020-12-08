const {body} = require("express-validator");
const path = require("path");
const allFunctions = require("../helpers/allFunctions")
const bcrypt = require("bcryptjs")



module.exports={
    register:[
        body("email")
            .notEmpty()
            .withMessage("El campo de email no puede estar vacío")
            .bail()
            .isEmail()
            .withMessage("Formato de email inválido")
            .bail()
            .custom((value)=>{
                const users = allFunctions.getAllUsers()
                const findUser = users.find((user)=>user.email==value)
                return !findUser
            })
            .withMessage("El email ingresado ya se encuentra en uso")
            .bail(),
        body("password")
            .notEmpty()
            .withMessage("El campo de contraseña no puede estar vacío")
            .bail()
            .isLength({min:6})
            .withMessage("La contraseña debe tener al menos 6 caracteres")
            .bail()
            .custom((value,{req})=>{
                if(value==req.body.retype){
                    return true
                }
                return false
            })
            .withMessage("Las contraseñas deben coincidir")
            .bail(),
        body("retype")
            .notEmpty()
            .withMessage("El campo de repetir contraseña no puede estar vacío"),
        body("avatar")
            .custom((value, {req})=>{
                if(req.files[0]){
                    return true
                }
                return false
            })
            .withMessage("La imagen de avatar es obligatoria")
            .bail()
            .custom((value, {req})=>{
                const imgAcceptedFormats = [".jpg",".png",".jpeg"];
                const userUploadedImg = path.extname(req.files[0].originalname);
                return imgAcceptedFormats.includes(userUploadedImg);
            })
            .withMessage("Formato de imagen no valido, formatos aceptados: jpg, png & jpeg")
    ],
    login:[
        body("email")
            .notEmpty()
            .withMessage("El campo de email no puede estar vacío")
            .bail()
            .isEmail()
            .withMessage("Formato de email inválido")
            .bail()
            .custom((value,{req})=>{
                const users = allFunctions.getAllUsers()
                const userToFind = users.find((user)=>{
                  return user.email == value
                 })
                 if(userToFind && bcrypt.compareSync(req.body.password, userToFind.password)){
                    return true;
                }
                return false;
            })
            .withMessage('Email o contraseña inválidos'),
        body("password")
            .notEmpty()
            .withMessage("Debes ingresar una contraseña")
    ]
}