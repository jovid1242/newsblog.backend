const Image = require('../models/Image')

const upload = async (req, res, next) => {
    console.log(req.file);
    const image = new Image({
        imagename: req.files.file.name
    })
    try {
        await image.save().then(data => {
            res.json({
                data: {
                    images: req.files.file.name,
                    message: 'Успешно'
                }
            })
        })
            .catch(error => {
                res.json({
                    message: 'Ошибка'
                })
            })
    } catch (e) {
        res.json({
            message: e
        })
    }
}

module.exports = {
    upload
}