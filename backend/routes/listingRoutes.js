const express = require('express')
const router = express.Router()


const {createListing, getListings, getListing,deleteListing} = require('../controllers/listingController')




const { protect } = require('../middleware/authMiddleware')

router.get('/', protect, getListings)
router.post('/',protect, createListing)
router.get('/:id',protect, getListing)
router.delete('/:id',protect,deleteListing)


module.exports = router