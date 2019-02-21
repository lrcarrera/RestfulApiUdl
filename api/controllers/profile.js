var mongoose = require('mongoose');
var User = mongoose.model('User');

module.exports.profileRead = function(req, res) {

  //Do error trapping
  // If no user ID exists in the JWT return a 401
  //req.get(headerName)
  if (!req.headers.Authorization) {
    res.status(401).json({
      "message" : "UnauthorizedError: private profile"
    });
  } else {
    // Otherwise continue
    console.log("Authorized user");
    User
      .findById(req.headers.Authorization)
      .exec(function(err, user) {
        res.status(200).json(user);
      });
  }

};
