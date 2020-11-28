const express = require('express');
// const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const Route = require('./routes/routes');
const mongoUrl = 'mongodb://localhost/userDB';

mongoose.connect(mongoUrl, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const db = mongoose.connection
db.on('error', (err) => {
    console.log('err');
})
db.once('open', () => {
    console.log('Database Connected');
})

const port = 5000
app.listen(port, function () {
    console.log('Api Started!');
})

app.use(morgan('dev'));
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/api', Route);