const jwt = require('jsonwebtoken');
const { validateRefreshToken, updateIDPToken } = require('../models/database');

exports.token = async (req, res) => {
    const refreshToken = req.cookies['APP_REFRESH_TOKEN'];

    if (!refreshToken) {
        return res.status(401).send('Unauthorized');
    }

    const isValid = await validateRefreshToken(refreshToken);
    if (!isValid) {
        return res.status(401).send('Unauthorized');
    }

    const idpTokenIsValid = await checkIDPAccessToken(refreshToken);

    if (!idpTokenIsValid) {
        const idpRefreshTokenIsValid = await checkIDPRefreshToken(refreshToken);
        if (!idpRefreshTokenIsValid) {
            return res.status(401).send('Unauthorized - IDP Token Expired');
        }

        const newIDPAccessToken = await updateIDPToken(refreshToken);
        if (!newIDPAccessToken) {
            return res.status(401).send('Failed to refresh IDP token');
        }
    }

    const payload = {
        username: 'username',
        email: 'user@example.com',
        sub: 'user-id',
    };

    const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '1h' });
    res.json({ token });
};