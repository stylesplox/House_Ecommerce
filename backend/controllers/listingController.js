const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const Listing= require('../models/listingModel')



const createListing = asyncHandler(async (req,res) =>{
    const { bathrooms,bedrooms,discountedPrice,furnished,imgUrl,latitude,longitude,location,name,offer,
        parking,regularPrice,timestamp,type } = req.body

    //console.log('req.file', req.file);
  
    const file_name = new Date().getTime() +'_'+req.file.originalname;

    let fs = require('fs');
    fs.rename(req.file.path, 'backend/uploads/'+file_name, function(err) {
      if ( err ) console.log('ERROR: ' + err);
    });


    const user = await User.findById(req.user.id)
    
    if (!user){
        res.status(401)
        throw new Error('User not found')
    }
    

    

    const listing = await Listing.create({
        bathrooms,
        bedrooms,
      discountedPrice,
      furnished,
      imgUrl : file_name,
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

  
    


    const listings = await Listing.find({})
    

    res.status(200).json(listings)
})

const getListing = asyncHandler(async (req, res) => {
    // Get user using the id in the JWT
  
  
    const listing = await Listing.findById(req.params.id)
    
    if (!listing) {
      res.status(404)
      throw new Error('listing not found')
    }
   /* 
    if (listing.userRef.toString() !== req.user.id) {
      res.status(401)
      throw new Error('Not Authorized')
    }
  */
    res.status(200).json(listing)
  })

  const deleteListing = asyncHandler(async (req, res) => {
    // Get user using the id in the JWT
    const user = await User.findById(req.user.id)
  
    if (!user) {
      res.status(401)
      throw new Error('User not found')
    }

    const listing = await Listing.findById(req.params.id)
    if (!listing) {
      res.status(404)
      throw new Error('Ticket not found')
    }
  
    if (listing.userRef.toString() !== req.user.id) {
      res.status(401)
      throw new Error('Not Authorized')
    }

    console.log(listing)
    /*
    
    const fs = require("fs");

    const path = `backend/uploads/${listing.imgUrl}`

    fs.unlink(path, function (err) {
    if (err) {
      console.error(err);
    } else {
      console.log("File removed:", path);
    }
  });
  */
    await Listing.remove(listing)
  
    res.status(200).json({ success: true })
  })
module.exports = {
    createListing,
    getListings,
    getListing,
    deleteListing,
}