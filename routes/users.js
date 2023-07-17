const express = require('express');
const router = express.Router();

const { User } = require('../models');

router.get('/', async (req, res) => {
    try {
        const users = await User.findAll();
        return res.status(200).json(users);
    } catch (error) {
        return res.status(500).json({ error: "Terjadi kesalahan pada server." });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json({ error: "Terjadi kesalahan pada server." });
    }
});

router.post('/', async (req, res) => {
    try {
        const user = await User.create(req.body);
        return res.status(201).json({
            message: `Data berhasil ditambahkan: ${user.name}`
        });
    } catch (error) {
        return res.status(500).json({ error: "Terjadi kesalahan pada server." });
    }
});

router.patch('/:id', async (req, res) => {
    try {
        await User.update(req.body, {
            where: {
                id: req.params.id
            }
        });
        return res.status(200).json({ message: 'Data berhasil diubah' });
    } catch (error) {
        return res.status(500).json({ error: "Terjadi kesalahan pada server." });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        await User.destroy({
            where: {
                id: req.params.id
            }
        });
        return res.status(204).send();
    } catch (error) {
        return res.status(500).json({ error: "Terjadi kesalahan pada server." });
    }
});

module.exports = router;