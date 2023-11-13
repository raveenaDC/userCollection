const jwt = require('jsonwebtoken')
const tokenSecret = "verifyTokenUsingJwt1234"
module.exports.generateTokens = (userId, userName) => {
    const accessToken = jwt.sign({ id: userId, name: userName, }, tokenSecret, { expiresIn: '1d' });
    return accessToken;
}
