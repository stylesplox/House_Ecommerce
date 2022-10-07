import { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import {getListing} from '../features/listings/listingSlice'
//import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper'
//import { Swiper, SwiperSlide } from 'swiper/react'
//import 'swiper/swiper-bundle.css'
import Spinner from '../components/Spinner'
import shareIcon from '../assets/svg/shareIcon.svg'
//SwiperCore.use([Navigation, Pagination, Scrollbar, A11y])

function Listing() {
  const [shareLinkCopied, setShareLinkCopied] = useState(false)
  const { listing, isLoading, isSuccess, isError, message } = useSelector((state) => state.listing)

  const user = JSON.parse(localStorage.getItem('user'))

  
  const navigate = useNavigate()
  const params = useParams()
  const dispatch = useDispatch()
  const {listingId} = useParams()

  useEffect(() =>{
    if(isError){
        toast.error(message)
    }
    dispatch(getListing(listingId))
    // eslint-disable-next-line
},[isError, message, listingId])
 
  
  const position = [51.505, -0.09]
  
  if (isLoading) {
    return <Spinner />
  }
  return (
    <main>
      
     

      <div
        className='shareIconDiv'
        onClick={() => {
          navigator.clipboard.writeText(window.location.href)
          setShareLinkCopied(true)
          setTimeout(() => {
            setShareLinkCopied(false)
          }, 2000)
        }}
      >
        <img src={shareIcon} alt='' />
      </div>

      {shareLinkCopied && <p className='linkCopied'>Link Copied!</p>}

      <div className='listingDetails'>
      {typeof(listing.imgUrl) !== 'undefined' ?
      <img
          src={require(`../assets/house-images/${listing.imgUrl}`)}

          alt={listing.name}
          className='categoryListingImg'
        />:
        <></>
      }
        <p className='listingName'>
          {listing.name} - $
          {listing.offer
            ? listing.discountedPrice
               
            : listing.regularPrice
                }
        </p>
        <p className='listingLocation'>{listing.location}</p>
        <p className='listingType'>
          For {listing.type === 'rent' ? 'Rent' : 'Sale'}
        </p>
        {listing.offer && (
          <p className='discountPrice'>
            ${listing.regularPrice - listing.discountedPrice} discount
          </p>
        )}

        <ul className='listingDetailsList'>
          <li>
            {listing.bedrooms > 1
              ? `${listing.bedrooms} Bedrooms`
              : '1 Bedroom'}
          </li>
          <li>
            {listing.bathrooms > 1
              ? `${listing.bathrooms} Bathrooms`
              : '1 Bathroom'}
          </li>
          <li>{listing.parking && 'Parking Spot'}</li>
          <li>{listing.furnished && 'Furnished'}</li>
        </ul>

        <p className='listingLocationTitle'>Location</p>

        <div className='leafletContainer'>
          <MapContainer
            style={{ height: '100%', width: '100%' }}
            center={position}
            zoom={13}
            scrollWheelZoom={false}
          >
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url='https://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png'
            />

            <Marker
              position={position}
            >
              <Popup>{listing.location}</Popup>
            </Marker>
          </MapContainer>
        </div>

        {user._id !== listing.userRef && (
          <Link
            to={`/contact/${listing.userRef}?listingName=${listing.name}`}
            className='primaryButton'
          >
            Contact Landlord
          </Link>
        )}
      </div>
    </main>
  )
}

export default Listing

// https://stackoverflow.com/questions/67552020/how-to-fix-error-failed-to-compile-node-modules-react-leaflet-core-esm-pat