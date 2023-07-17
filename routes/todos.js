const express = require('express');
const router = express.Router();

const { Todo, User } = require('../models');

router.get('/', async (req, res) => {
    try {
        const todos = await Todo.findAll({
            include: [
                { model: User, as: 'User', attributes: ['name','email'] }
            ]
        });
        return res.status(200).json(todos);
    } catch (error) {
        return res.status(500).json({ error: "Terjadi kesalahan pada server." });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const todo = await Todo.findByPk(req.params.id, {
            include: [
                {model: User, as: 'User', attributes: ['name','email']}
            ]
        });
        return res.status(200).json(todo);
    } catch (error) {
        return res.status(500).json({ error: "Terjadi kesalahan pada server." });
    }
});

router.post('/', async (req, res) => {
    try {
        const task = await Todo.create(req.body);
        return res.status(201).json({
            message: `Data berhasil ditambahkan: ${task.taskName}`
        });
    } catch (error) {
        return res.status(500).json({ error: "Terjadi kesalahan pada server." });
    }
});

router.patch('/:id', async (req, res) => {
    try {
        await Todo.update(req.body, {
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
        await Todo.destroy({
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