import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import listingService from './listingService'

const initialState = {
    listings: [],
    listing: {},
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
  }

  export const listingSlice = createSlice({
    name: 'listing',
    initialState,
    reducers: {
      reset: (state) => initialState,
    },
    extraReducers: (builder) => {
      builder
        .addCase(createListing.pending, (state)=>{
          state.isLoading = true
        })
        .addCase(createListing.fulfilled, (state)=>{
          state.isLoading = false
          state.isSuccess = true
        })
        .addCase(createListing.rejected, (state, action)=>{
          state.isLoading = false
          state.isError = true
          state.message = action.payload
        })
        .addCase(getListings.pending, (state) => {
          state.isLoading = true
        })
        .addCase(getListings.fulfilled, (state, action) => {
          state.isLoading = false
          state.isSuccess = true
          state.listings = action.payload
        })
        .addCase(getListings.rejected, (state, action) => {
          state.isLoading = false
          state.isError = true
          state.message = action.payload
        })

        .addCase(getListing.pending, (state) => {
          state.isLoading = true
        })
        .addCase(getListing.fulfilled, (state, action) => {
          state.isLoading = false
          state.isSuccess = true
          state.listing = action.payload
        })
        .addCase(getListing.rejected, (state, action) => {
          state.isLoading = false
          state.isError = true
          state.message = action.payload
        })
      
    },
})

export const createListing = createAsyncThunk(
    'listings/create',
    async (listingsData, thunkAPI) => {
      try {
        console.log({ listingsData } )
        const token = thunkAPI.getState().auth.user.token
        return await listingService.createListing(listingsData, token)
      } catch (error) {
        const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
  
      return thunkAPI.rejectWithValue(message)
      }
    }
  )

  // Get user listings
export const getListings = createAsyncThunk(
  'listings/getAll',
  async (_, thunkAPI) => {
    try {
      const token = localStorage.getItem('token')
      return await listingService.getListings(token)
    } catch (error) {
      const message =
      (error.response &&
        error.response.data &&
        error.response.data.message) ||
      error.message ||
      error.toString()

    return thunkAPI.rejectWithValue(message)
    }
  }
)

// Get user listing
export const getListing = createAsyncThunk(
  'listings/get',
  async (listingId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await listingService.getListing(listingId, token)
    } catch (error) {
      const message =
      (error.response &&
        error.response.data &&
        error.response.data.message) ||
      error.message ||
      error.toString()

    return thunkAPI.rejectWithValue(message)
    }
  }
)


  

export const {reset} = listingSlice.actions
export default listingSlice.reducer