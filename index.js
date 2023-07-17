const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const app = express();
const port = 3001;

let authRouter = require('./routes/auth');
let todosRouter = require('./routes/todos');
let usersRouter = require('./routes/users');
let refreshTokenRouter = require('./routes/refresh');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    return res.send('TODO LIST API..');
});

app.use('/auth', authRouter);
app.use('/token', refreshTokenRouter);
app.use('/todos', todosRouter);
app.use('/users', usersRouter);

app.listen(port, () => {
    console.log(`http://localhost:${port}`);
});