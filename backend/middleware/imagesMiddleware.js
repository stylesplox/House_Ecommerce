const multer = require('multer')
const upload = multer({dest: './backend/uploads'})

function imageHandler(name) {
    return upload.single(name)
}

module.exports = {imageHandler}