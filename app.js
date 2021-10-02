const express = require('express');

const morgan = require('morgan');

const app = express();

const dotenv = require('dotenv');


dotenv.config();

app.use(morgan('dev'));

app.use(express.json());





module.exports = app;