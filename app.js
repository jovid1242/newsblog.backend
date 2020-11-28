const upload = require('express-fileupload');
const express = require('express')
const bodyParser = require('body-parser');
// const mongoose = require('mongoose');
const cors = require('cors');
// const User = require('./models/User')
// const mongoUrl = 'mongodb://localhost/userDB';
const fs = require('fs')
const dbConfig = require('./db.js')
const Route = require('./routes/routes');
const morgan = require('morgan');
const path = require('path');
const { log } = require('console');
const image_path = path.resolve(__dirname, 'uploads/');
require('dotenv').config()

const app = express();

app.use(upload())

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

app.use(morgan('dev'));
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/api', Route);

app.post('/api/upload', async (req, res) => {
    if (req.files) {
        let file = req.files.file
        let filename = file.name
        console.log(filename);
        const image = {
            imagename: filename,
            imagepath: `${process.env.API_URL}img/${filename}`
        }
        const sql = `INSERT INTO library (imagename, imagepath) VALUES ('${image.imagename}', '${image.imagepath}')`;
        dbConfig.query(sql, function (err, result) {
            if (err) {
                res.json({
                    message: err
                })
            }
            try {
                res.json({
                    data: {
                        images: req.files.file.name,
                        message: 'Успешно! картинка загружено на библотека'
                    }
                })
            }
            catch {
                res.json({
                    message: error
                })
            }
            file.mv('./uploads/' + filename)
        })
    }
})

app.post('/api/post', async (req, res) => {
    const post = req.body.post
    console.log(post);
    const sql = `INSERT INTO post (text) VALUES ('${post}')`;
    dbConfig.query(sql, function (err, result) {
        if (err) {
            res.json({
                message: err
            })
        }
        try {
            res.json({
                data: {
                    text: req.body.data,
                    message: 'Успешно!'
                }
            })
        }
        catch {
            res.json({
                message: error
            })
        }
    })
})

// 9200 - 97099

app.get('/api/posts/:postname', (req, res) => {
    dbConfig.query(`SELECT * FROM post`, function (err, result) {
        if (err) {
            res.json({
                message: err
            })
        }
        res.json(result);
    });
})
app.get('/api/posts', (req, res) => {
    dbConfig.query(`SELECT * FROM post`, function (err, result) {
        if (err) {
            res.json({
                message: err
            })
        }
        res.json(result);
    });
})

app.get('/api/images', (req, res) => {
    dbConfig.query(`SELECT * FROM library`, function (err, result) {
        if (err) {
            res.json({
                message: err
            })
        }
        res.json(result);
    });
})

app.get('/api/img/:imagename', (req, res) => {
    let filepath = path.join(__dirname + `/uploads/${req.params.imagename}`);
    res.sendFile(filepath);
})

const port = 8008;
app.listen(port, function () {
    console.log('Сервер запущен на ' + port + ' порту');
})