const jwt = require('jsonwebtoken');

exports.verifyJWT = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) return res.status(401).send('Unauthorized');

    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if (err) return res.status(403).send('Forbidden');

        req.user = decoded;
        next();
    });
};

