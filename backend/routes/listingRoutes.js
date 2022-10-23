const express = require('express')
const router = express.Router()

const {createListing, getListings, getListing,deleteListing} = require('../controllers/listingController')



const {imageHandler} = require("../middleware/imagesMiddleware")
const { protect } = require('../middleware/authMiddleware')
router.get('/', getListings)
router.post('/', imageHandler('imgUrl'), protect, createListing)
router.get('/:id',protect, getListing)
router.delete('/:id',protect,deleteListing)


module.exports = router