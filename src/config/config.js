const { Issuer } = require('openid-client');
const dotenv = require('dotenv');

dotenv.config();

(async () => {
    const googleIssuer = await Issuer.discover('https://accounts.google.com');
    const client = new googleIssuer.Client({
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        redirect_uris: ['http://localhost:3000/auth-callback'],
        response_types: ['code']
    });

    module.exports = { client };
})();
