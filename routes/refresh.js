const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const { User } = require('../models');

// Get User Listing
router.get('/', async (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if(!refreshToken) return res.sendStatus(204);
    const user = await User.findOne({
        where: {
            refreshToken: refreshToken
        }
    });
    if(!user) return res.sendStatus(403);
    jwt.verify(refreshToken, '9627ee3df45b32f04e58', (err, decoded) => {
        if(err) return res.sendStatus(403);
        const userId = user.id;
        const userName = user.name;
        const userEmail = user.email;
        const accessToken = jwt.sign({ userId, userName, userEmail }, '55cf6a5df352029e211c', { expiresIn: '15s' });
    });
    return res.json({ accessToken });
});

module.exports = router;