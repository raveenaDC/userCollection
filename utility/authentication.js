const jwt = require('jsonwebtoken');
const tokenSecret = 'verifyTokenUsingJwt1234';

module.exports.verifyToken = (req, res, next) => {
    const token = req.header('Authorization');

    if (!token) {
        return res.send("You are unauthorized");
    }

    jwt.verify(token, tokenSecret, (err, user) => {
        if (err) {
            return res.send("Something went wrong", err);
        }
        req.user = user;
        next();
    });
};