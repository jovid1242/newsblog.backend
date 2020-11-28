const express = require('express')
const router = express.Router()
const multer = require('multer')

const AuthController = require('../controller/AuthController')
const UploadController = require('../controller/UploadController')
const upload = require('../middlewere/upload')

router.post('/register', AuthController.register)
router.post('/login', AuthController.login)
// router.post('/uploadPhoto', upload.single('imagename'), UploadController.upload)

module.exports = router