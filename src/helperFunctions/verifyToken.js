var jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
    const secretAccessKey = process.env.JWT

    var token = req.headers['x-access-token'];

    if (!token) {
        req.authenticated = false;
        next();
    } else {
        jwt.verify(token, secretAccessKey, function(err, decoded) {
    if (err) {
        req.authenticated = false;
    } else {
        req.authenticated = true;
        req.userId = decoded.id;
    }
    next();
    });
    }
}

module.exports = verifyToken;