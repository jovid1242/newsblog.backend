const mongoose = require('mongoose')

const Schema = mongoose.Schema

const photoSchema = new Schema({
    imagename: {
        type: String, required: true
    },
    image_path: {
        type: String, required: true
    }
}, { timestamps: true })

const Image = mongoose.model('Image', photoSchema)
module.exports = Image