const jwt = require("jsonwebtoken");

exports.postMiddleware = (req, res, next) => {
    console.log(123)
    if (!req.headers.authorization) {
        return res.status(401).json({ message: "Авторизируйтесь!" })
    }
    console.log(456)
    next()
}