const mongoose = require('mongoose');
const passport = require('passport');
const User = mongoose.model('User');
const jwt = require('jsonwebtoken');


module.exports.profile_read = function (req, res) {

    //Do error trapping
    // If no user ID exists in the JWT return a 403
    let token = req.headers.authorization.split(" ")[1];
//  var payload = jwt.decode(token, "MY_SECRET");

    jwt.verify(token, 'MY_SECRET', (err, authorizedData) => {
        if (err) {
            //If error send Forbidden (403)
            console.log('ERROR: Could not connect to the protected route');
            res.sendStatus(403);
        } else {
            //If token is successfully verified, we can send the autorized data
            res.json({
                message: 'Successful log in',
                authorizedData
            });
            console.log('SUCCESS: Connected to protected route');
        }
    });

    /*  if (!payload._id) {
        res.status(401).json({
          "message" : "UnauthorizedError: private profile"
        });
      } else {
        console.log("Authorized user");
        User
          .findById(req.headers.Authorization)
          .exec(function(err, user) {
            res.status(200).json(user);
          });
      }*/

};
