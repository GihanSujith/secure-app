const { client } = require('../config/config');
const { generateCodeVerifier, generateCodeChallenge } = require('../utils/jwtUtils');
const { saveAuthState } = require('../models/database');

exports.auth = (req, res) => {
    const code_verifier = generateCodeVerifier();
    const code_challenge = generateCodeChallenge(code_verifier);
    
    saveAuthState(code_challenge);

    const authUrl = client.authorizationUrl({
        scope: 'openid email profile',
        code_challenge,
        code_challenge_method: 'S256',
    });

    res.redirect(authUrl);
};

exports.authCallback = async (req, res) => {
    try {
        const params = client.callbackParams(req);
        const tokenSet = await client.callback('http://localhost:3000/auth-callback', params);
        const userInfo = await client.userinfo(tokenSet.access_token);
        
        res.redirect('/token');
    } catch (error) {
        res.status(500).send('Error during authentication');
    }
};
