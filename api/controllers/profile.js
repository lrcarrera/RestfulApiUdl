var mongoose = require('mongoose');
var User = mongoose.model('User');

module.exports.profileRead = function(req, res) {

  //Do error trapping
  // If no user ID exists in the JWT return a 401
  //req.get(headerName)
  res.status(200).json(req.payload._id);
  /*if (!req.payload._id) {
    res.status(401).json({
      "message" : "UnauthorizedError: private profile"
    });
  } else {
    console.log("Authorized user");
    User
      .findById(req.payload._id)
      .exec(function(err, user) {
        res.status(200).json(user);
      });
  }*/

};
