const cors = require('cors');
const express = require('express');
const helmet = require('helmet');
//const db = require('./db');

const PORT = 8092;
const app = express();
module.exports = app;

app.use(require('body-parser').json());
app.use(cors());
app.use(helmet());

app.options('*', cors());



console.log(`📡 Running on port ${PORT}`);
app.listen(PORT);
