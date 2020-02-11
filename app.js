require("dotenv").config();

const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const clienteRouter = require('./routes/cliente');
const gerenciaRouter = require('./routes/gerencia');
const dietaRouter = require('./routes/dieta');

const app = express();

mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
}).catch(err => console.log(err));

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/cliente', clienteRouter);
app.use('/admin', gerenciaRouter);
app.use('/dieta', dietaRouter);


app.listen(process.env.Port || 4000);

module.exports = app;