//import jwtDecode from 'jwt-decode'

const { sign, verify } = require("jsonwebtoken");
const JWT_SECRET = 'jwt_secret_key';
const JWT_VALIDITY = '1 days';

const createTokens = (data) => {
    const accessToken = sign({ username: data.username, emailid: data.emailid }, JWT_SECRET, {
        expiresIn: JWT_VALIDITY,
    });
     //console.log(accessToken)

    return accessToken;
};

const validateToken = (req, res, next) => {
    const accessToken = req.cookies["access-token"];

    if (!accessToken)
        return res.status(400).json({ error: "User not Authenticated!" });

    try {
        const validToken = verify(accessToken, JWT_SECRET)
        if (validToken) {
            req.authenticated = true
            return next();
            
        }
    } catch (err) {
        return res.status(400).json({ error: err });
    }
}

module.exports = { createTokens, validateToken };