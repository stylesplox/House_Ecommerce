import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import Spinner from '../components/Spinner'
import { useSelector, useDispatch } from 'react-redux'
import { getListings, reset } from '../features/listings/listingSlice'
import ListingItem from '../components/ListingItem'


function Offers() {
  //const [listings, setListings] = useState(null)
  const [lastFetchedListing, setLastFetchedListing] = useState(null)
  const { listings, isLoading, isSuccess } = useSelector((state) => state.listing)

  const dispatch = useDispatch()

  useEffect(()=>{
    return ()=>{
        if(isSuccess){
            dispatch(reset())
        }
    }
}, [dispatch,isSuccess])
    

  useEffect(() => {
    dispatch(getListings())
    
    //const lastVisible = listings.length-1;
    //setLastFetchedListing(lastVisible)
  },[dispatch])
  //console.log(listings.filter(listing => listing.offer ===true))

  
  const filterListings= listings.filter(listing => listing.offer ===true)

  if (isLoading) {
    return <Spinner />
  }
  return (
    <div className='category'>
      <header>
        <p className='pageHeader'>Offers</p>
      </header>

      {filterListings && filterListings.length > 0 ? (
        <>
          <main>
            <ul className='categoryListings'>
              {filterListings.map((filterListing) => (
                <ListingItem
                  listing={filterListing}
                  id={filterListing._id}
                  key={filterListing._id}
                />
              ))}
            </ul>
          </main>

          <br />
          <br />
          
        </>
      ) : (
        <p>There are no current offers</p>
      )}
    </div>
  )
}
export default Offers