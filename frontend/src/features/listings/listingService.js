
import axios from 'axios'

const API_URL = '/api/listings/'

// Create new listing
const createListing = async (listingData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  var bodyFormData = new FormData();
  bodyFormData.append('name', listingData.name);
  bodyFormData.append('type', listingData.type);
  bodyFormData.append('bedrooms', listingData.bedrooms);
  bodyFormData.append('bathrooms', listingData.bathrooms);
  bodyFormData.append('parking', listingData.parking);
  bodyFormData.append('furnished', listingData.furnished);
  bodyFormData.append('location', listingData.location);
  bodyFormData.append('offer', listingData.offer);
  bodyFormData.append('regularPrice', listingData.regularPrice);
  bodyFormData.append('discountedPrice', listingData.discountedPrice);
  bodyFormData.append('imgUrl', listingData.imgUrl);
  bodyFormData.append('longtitude', listingData.longtitude);
  bodyFormData.append('latitude', listingData.latitude);
  bodyFormData.append('userRef', listingData.userRef);

  const firstResponse = await axios.post(API_URL, bodyFormData, config)
  const secondResponse = await axios.get(API_URL, config)

  return secondResponse.data
}

const getListings = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.get(API_URL, config)
  console.log(response.data)
  return response.data
}

// Get user listing
const getListing = async (listingId, token) => {

  const response = await axios.get(API_URL + listingId)

  return response.data
}

// Close ticket
const deleteListing = async (listingId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const firstResponse = await axios.delete(API_URL + listingId,config)
  const secondResponse = await axios.get(API_URL, config)

   
  return secondResponse.data
}


const listingService ={
    createListing,
    getListings,
    getListing,
    deleteListing,
}

export default listingService