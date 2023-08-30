const jwt = require('jsonwebtoken')
const secret = require("../config/jwt");

function verifyToken(req, res, next) {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({ message: "Unable to access!" });
    }
    const tokenString = token.slice(7); // Remove 'Bearer ' from the token string.
    jwt.verify(tokenString, secret, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Invalid Token' });
        }
        req.decoded = decoded;
        next();
    });
}

module.exports = verifyToken;