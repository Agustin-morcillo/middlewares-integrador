const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const validator = require("../middlewares/validator")
const multer = require("multer")
const authMiddleware = require("../middlewares/auth");
const guestMiddleware = require("../middlewares/guest")

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/images/users');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + ' - ' + file.originalname);
    }
})

const upload = multer({ 
    storage: storage
})


// Muestra la vista de registro
router.get('/register', guestMiddleware,userController.showRegister);

// Procesa la vista de registro
router.post('/register',upload.any(), validator.register,guestMiddleware,userController.processRegister);

// Muestra la vista de login
router.get('/login', guestMiddleware,userController.showLogin);

// Procesa la vista de login
router.post('/login', validator.login,guestMiddleware,userController.processLogin);

// Muestra el perfil del usuario
router.get('/profile',authMiddleware ,userController.showProfile);

// Cierra la sesión
router.get('/logout', authMiddleware,userController.logout);

module.exports = router;