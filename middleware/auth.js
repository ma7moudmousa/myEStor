const jwt = require('jsonwebtoken');
const config = require('config');
function authFun(req, res, next) {
    try {
        const token = req.header("x-auth-token");
        if (token) {
            const userData = jwt.verify(token, 'mysecretkey');
            if (userData) {
                req.user = userData;
                next();
            }
            else {
                res.status(400).send({ message: "invalid token" });
            }
        }
        else {
            res.status(401).send({ message: "u r not allowed to be here" });
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}
module.exports = authFun;
