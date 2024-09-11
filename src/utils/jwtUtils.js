const { generateKeyPair } = require('jose');

async function generateKeys() {
    const { publicKey, privateKey } = await generateKeyPair('RS256');
    return { publicKey, privateKey };
}

exports.rotateKeys = async () => {
    const { publicKey, privateKey } = await generateKeys();

    await saveKeysInDatabase(publicKey, privateKey);
};