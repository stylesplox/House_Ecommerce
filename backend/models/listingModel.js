const mongoose = require('mongoose')

const listingSchema = mongoose.Schema(
    {
        bathrooms:{
            type: Number,
            required: true,
        },
        bedrooms:{
            type: Number,
            required: true,
        },
        discountedPrice:{
            type: Number,
            required: true,
        },
        furnished:{
            type: Boolean,
            required: true,
        },
        
        imgUrl:{
            type: Object,
            required: true,
        },
        geolocation:{
            lat:{
                type:Number,
                required: true,
                default: 51.505
            },
            lng:{
                type:Number,
                required: true,
                default: -0.09
            }
        },
        location:{
            type: String,
            required: true,
        },
      
        name:{
            type: String,
            required: true,
        },
        offer:{
            type: Boolean,
            required: true,
        },
        parking:{
            type: Boolean,
            required: true,
        },
        regularPrice:{
            type: Number,
            required: true,
        },
        timestamp:{
            type: Date,
            default: Date.now,
            required: false,
            
        },
        type:{
            type: String,
            required: true,
            enum: ['rent', 'sale'],
        },
        userRef: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
          },
    }
)

module.exports = mongoose.model('Listing', listingSchema)