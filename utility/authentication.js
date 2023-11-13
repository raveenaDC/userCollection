const jwt = require('jsonwebtoken');
const tokenSecret = 'verifyTokenUsingJwt1234';

module.exports.verifyToken = (req, res, next) => {
    const token = req.header('Authorization');
    authToken = token?.replace(/^Bearer\s+/, "");
    if (!authToken) {
        return res.status(400).send("You are unauthorized")
        // res.send("You are unauthorized");
    }

    jwt.verify(authToken, tokenSecret, (err, user) => {
        if (err) {
            console.log(err)
            return res.status(403).send("Invalid Token",)

        }
        req.user = user;
        next();
    });
};