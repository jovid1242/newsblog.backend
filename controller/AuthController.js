// const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const dbConfig = require('../db.js');
const crypto = require('crypto')

const register = (req, res, next) => {
    const hash = crypto.createHmac('sha256', req.body.password)
        .update('I love cupcakes')
        .digest('hex');
    let token = jwt.sign({ name: req.body.name }, 'verysecretValue', { expiresIn: '1h' })
    let user = {
        name: req.body.name,
        email: req.body.email,
        password: hash,
        remember_token: token
    }
    const sql = `INSERT INTO users (name, email, password, remember_token ) VALUES ('${user.name}', '${user.email}', '${user.password}', '${user.remember_token}')`;
    dbConfig.query(sql, function (err, result) {
        const users = result;
        if (err) {
            res.json({
                data: {
                    message: err
                }
            })
        }
        if (result) {
            try {
                res.json({
                    data: {
                        name: req.body.name,
                        email: req.body.email
                    },
                    meta: {
                        token: token
                    }
                })
            }
            catch {
                res.json({
                    message: 'Ошибка!'
                })
            }
        }
    })
}

const login = (req, res, next) => {
    const hash = crypto.createHmac('sha256', req.body.password)
        .update('I love cupcakes')
        .digest('hex');
    const username = req.body.username;
    const password = hash;
    const sql = `SELECT * FROM users WHERE email = ? AND password = ?`
    dbConfig.query(sql, [username, password], function (err, result) {
        const users = result;
        if (err) {
            res.json({
                data: {
                    message: 'Ошибка! :' + err
                }
            })
        }
        if (result) {
            try {
                res.json({
                    data: {
                        name: users[0].name,
                        email: users[0].email
                    },
                    meta: {
                        token: users[0].remember_token
                    }
                })
            }
            catch {
                res.json({
                    message: 'Ошибка !'
                })
            }
        }
    })
}




module.exports = {
    register, login
}