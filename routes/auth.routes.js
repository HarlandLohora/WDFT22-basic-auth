// RECORDATORIO Hay diferentes maneras de llegar al mismo resultado :)
// const express = require("express")
// const mirouter = express.Router()
// mirouter.get("/")

const router = require("express").Router();
const bcrypt = require("bcryptjs");
const User = require('../models/User.model')

// 1.- Crear una ruta para ENVIAR el Form al usuario - GET url '/auth/signup'
// 2.- Crear una ruta para obtener la informacion del usuario 
//     que ingreso en el form y GUARDARLA en BD - POST url '/auth/registrarUsuario'

// --- 1 ---
router.get("/auth/signup", (req, res) => {
    res.render("auth/signup")
})


// --- 2 --- 

// Check - Recibir los datos en req.body
// Check - Obtener la contrasena que esta en req.body.password
// Check - Hacer las cosas de Bcrypt
//   - Generar el salt
//   - Generar el hash a partir de el salt y req.body.password
// Check - Modificar req.body.password con el hash generado en el paso anterior
// Guardar todo el req.body en nuestro modelo User/ guardar en BD

router.post("/auth/signup", (req, res) => {
    const { password, email } = req.body
    const saltRounds = 12

    const salt = bcrypt.genSaltSync(saltRounds)
    const newPassword = bcrypt.hashSync(password, salt);

    //Poner todos los email en minuscula
    const emailLowerCase = email.toLowerCase()
    req.body.email = emailLowerCase
    req.body.passwordHash = newPassword
    delete req.body.password
    console.log(req.body)
    User.create(req.body)
        .then(() => {
            res.redirect("/userProfile")
        }).catch(console.log)
})

module.exports = router;