module.exports = function (req, res, next) {
    if (req.user.isadmin) {
        next();
    }
    else {
        res.status(403).send({ message: "ur not allowed to be here" })
    }
};