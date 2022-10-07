const asyncHandler = require('express-async-handler')

const User = require('../models/userModel')
const Listing= require('../models/listingModel')


const createListing = asyncHandler(async (req,res) =>{
    const { bathrooms,bedrooms,discountedPrice,furnished,geolocation,imgUrl,latitude,location,longitude,name,offer,
        parking,regularPrice,timestamp,type,userRef } = req.body

    const user = await User.findById(req.user.id)
    
    if (!user){
        res.status(401)
        throw new Error('User not found')
    }

    console.log({bathrooms})
    console.log(bedrooms)
    console.log(discountedPrice)
    console.log(furnished)
    console.log({imgUrl})
    console.log({latitude})
    console.log({location})
    console.log({longitude})
    console.log(name)
    console.log(offer)
    console.log(parking)
    console.log(regularPrice)
    console.log(timestamp)
    console.log(type)
    console.log(userRef)

    const listing = await Listing.create({
        bathrooms,
        bedrooms,
      discountedPrice,
      furnished,
      imgUrl: 'exterior_4.jpeg',
      latitude,
      location,
      longitude,
      name,
      offer,
      parking,
      regularPrice,
      timestamp,
      type,
      userRef: req.user.id
    })

/*
    const listing = await Listing.create({
      bathrooms: 2,
      bedrooms: 2,
      discountedPrice: 34333,
      furnished: true,
      imgUrl: 'exterior_4.jpeg',
      latitude: 51.34,
      location: 'wazwe',
      longitude:-43.43,
      name: 'Thwe Grove',
      offer: true,
      parking: true,
      regularPrice: 20000,
      timestamp,
      type: 'rent',
      userRef: req.user.id
  })

*/
    console.log({listing})
    console.log(listing)
    if (listing) {
        res.status(201).json({
          _id: listing._id,
          name: listing.name,
          message: 'House has been aded'
        })
      } else {
        res.status(400)
        throw new error('Invalid listing data')
      }
        
})

const getListings = asyncHandler(async(req,res) =>{
    const user = await User.findById(req.user.id)

    if (!user){
        res.status(401)
        throw new Error('User not found')
    }

    const listings = await Listing.find({ user:req.user.id })

    res.status(200).json(listings)
})

const getListing = asyncHandler(async (req, res) => {
    // Get user using the id in the JWT
    const user = await User.findById(req.user.id)
  
    if (!user) {
      res.status(401)
      throw new Error('User not found')
    }
  
    const listing = await Listing.findById(req.params.id)
    
    if (!listing) {
      res.status(404)
      throw new Error('listing not found')
    }
    
    if (listing.userRef.toString() !== req.user.id) {
      res.status(401)
      throw new Error('Not Authorized')
    }
  
    res.status(200).json(listing)
  })
module.exports = {
    createListing,
    getListings,
    getListing,
}