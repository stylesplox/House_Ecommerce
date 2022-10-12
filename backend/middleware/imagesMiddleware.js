const multer  = require('multer')
const uuidv4 = require('uuid')

const uploadImg = asyncHandler(async (req, res, next) => {

    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
        cb(null, './uploads')
        },
        filename: (req, file, cb) => {
        const fileName = file.originalname.toLowerCase().split(' ').join('-');
        cb(null, uuidv4() + '-' + fileName)
    
        }
    })
    let strImg = multer({ storage: storage })

    let upload = strImg.single('images')

})

module.exports = {upload}