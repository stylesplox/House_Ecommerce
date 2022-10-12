
import axios from 'axios'

const API_URL = '/api/listings/'

// Create new listing
const createListing = async (listingData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  console.log({listingData})
  const response = await axios.post(API_URL, listingData, config)

  return response.data
}

const getListings = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.get(API_URL, config)
  return response.data
}

// Get user listing
const getListing = async (listingId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      

    },
  }

  

  const response = await axios.get(API_URL + listingId, config)

  return response.data
}

// Close ticket
const deleteListing = async (listingId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.delete(API_URL + listingId,config)

   
  return response.data
}


const listingService ={
    createListing,
    getListings,
    getListing,
    deleteListing,
}

export default listingService