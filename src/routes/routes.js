const express = require('express');
const router = express.Router();

const { auth, authCallback } = require('../controllers/authController');
const { token } = require('../controllers/tokenController');
const { getUser } = require('../controllers/userController');
const { verifyJWT } = require('../middlewares/authMiddleware');

router.get('/auth', auth);
router.get('/auth-callback', authCallback);
router.post('/token', token);
router.get('/api/users', verifyJWT, getUser);

module.exports = router;

