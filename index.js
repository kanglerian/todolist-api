const express = require('express');
const cors = require('cors');
const app = express();
const port = 3001;

const { Todo } = require('./models');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    return res.send('TODO LIST API..');
});

app.get('/todos', async (req, res) => {
    try {
        const todos = await Todo.findAll();
        return res.status(200).json(todos);
    } catch (error) {
        console.log(error);
    }
});

app.get('/todo/:id', async (req, res) => {
    try {
        const todo = await Todo.findByPk(req.params.id);
        return res.status(200).json(todo);
    } catch (error) {
        console.log(error);
    }
});

app.post('/todos', async (req, res) => {
    const task = await Todo.create(req.body);
    return res.status(201).json({
        message: `Data berhasil ditambahkan: ${task.taskName}`
    });
});

app.patch('/todo/:id', async (req, res) => {
    await Todo.update(req.body, {
        where: {
            id: req.params.id
        }
    });
    return res.status(200).json({ message: 'Data berhasil diubah' });
});

app.delete('/todo/:id', async (req, res) => {
    try {
        await Todo.destroy({
            where: {
                id: req.params.id
            }
        });
        return res.status(204).send();
    } catch (error) {
        console.log(error);
    }
});

app.listen(port, () => {
    console.log(`http://localhost:${port}`);
});