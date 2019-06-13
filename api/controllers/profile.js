const jwt = require('jsonwebtoken');

module.exports.profile_read = function (req, res) {

    // If no user ID exists in the JWT return a 403
    let token = req.headers.authorization.split(" ")[1];

    jwt.verify(token, 'MY_SECRET', (err, authorizedData) => {
        if (err) {
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
};
