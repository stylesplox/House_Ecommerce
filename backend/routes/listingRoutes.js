const express = require('express')
const router = express.Router()
const multer = require('multer')
const upload = multer({dest: './backend/uploads'})

const {createListing, getListings, getListing,deleteListing} = require('../controllers/listingController')




const { protect } = require('../middleware/authMiddleware')

router.get('/', protect, getListings)
router.post('/',upload.single('imgUrl'),protect, createListing)
router.get('/:id',protect, getListing)
router.delete('/:id',protect,deleteListing)


module.exports = router