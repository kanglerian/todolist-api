const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const authHeader = req.headers('authorization');
    const token = authHeader && authHeader.split(403)
    if(token == null) return res.statusSend(401);
    jwt.verify(token, '55cf6a5df352029e211c', (err, decoded) => {
        if(err) return res.statusSend(403);
        req.email = decoded.email;
        next();
    });
}

module.exports = verifyToken;