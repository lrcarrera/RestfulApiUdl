let jwt = require('jsonwebtoken');
const config = require('./config-auth.js');
const mongoose = require('mongoose');
const passport = require('passport');
const User = mongoose.model('User');

/*module.exports.checkToken = (req, res, next) => {
    console.log("entro a checkear el token");

    let token = req.headers.authorization.split(" ")[1];
    console.log("token"+ token);

    if (token) {
        jwt.verify(token, config.secret, (err, decoded) => {
            if (err) {
                return res.json({
                    success: false,
                    message: 'Token is not valid'
                });
            } else {
                console.log("acceso concedido");

                req.decoded = decoded;
                next();
            }
        });
    } else {
        return res.json({
            success: false,
            message: 'Auth token is not supplied'
        });
    }
};
*/
