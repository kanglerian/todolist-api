const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const { User } = require('../models');

// Login
router.post('/', async (req, res) => {
    try {
        const user = await User.findOne({
            where: {
                email: req.body.email
            }
        });
        const userId = user.id;
        const userName = user.name;
        const userEmail = user.email;
        const accessToken = jwt.sign({ userId, userName, userEmail }, '55cf6a5df352029e211c', { expiresIn: '20s' });
        const refreshToken = jwt.sign({ userId, userName, userEmail }, '9627ee3df45b32f04e58', { expiresIn: '1d' });
        await User.update({ refreshToken: refreshToken }, {
            where: {
                id: userId
            }
        });
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000
        });
        return res.json({ accessToken });
    } catch (error) {
        res.status(404).json({ msg: 'Email tidak ditemukan.' })
    }
});

// Logout
router.delete('/logout', async (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if(!refreshToken) return res.sendStatus(204);
    const user = await User.findOne({
        where: {
            refreshToken: refreshToken
        }
    });
    if(!user) return res.sendStatus(204);
    const userId = user.id;
    await User.update({
        refreshToken: null
    },{
        where: {
            id: userId
        }
    });
    res.clearCookie('refreshToken');
    return res.sendStatus(200);
});

module.exports = router;