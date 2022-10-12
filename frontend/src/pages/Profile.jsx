//import {getAuth} from 'firebase/auth'
import {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { deleteListing, getListings, reset } from '../features/listings/listingSlice'
import ListingItem from '../components/ListingItem'
//import { db } from '../firebase.config'
//import {updateDoc, doc} from 'firebase/firestore'
import { toast } from 'react-toastify'
import arrowRight from '../assets/svg/keyboardArrowRightIcon.svg'
import homeIcon from '../assets/svg/homeIcon.svg'
import { updateUser } from '../features/auth/authSlice'
import { useNavigate } from 'react-router-dom'
import Spinner from '../components/Spinner'


function Profile() {
 


  const { user } = useSelector((state) => state.auth)
  const { listings, isLoading, isSuccess } = useSelector((state) => state.listing)
 
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [username] = useState(user.name)
  const [useremail] = useState(user.email)
  const [changeDetails, setChangeDetails] = useState(false)

  const [formData, setFormData] = useState({
    name: username,
    email: useremail,
  })


  const { name, email } = formData

  const onDelete = async (listingId) => {
    
    if (window.confirm('Are you sure you want to delete?')) {
      dispatch(deleteListing(listingId))
      setTimeout(() => {
        navigate('/profile')
        dispatch(getListings())
      }, 5000);
       
        
        
        //dispatch(getListings())
      toast.success('Successfully deleted listing')
    }
  }

  useEffect(() => {
    dispatch(getListings())
    
    return ()=>{
      if(isSuccess){
          dispatch(reset())
      }
    }
  },[dispatch,isSuccess])

  
  const filterListings= listings.filter(listing => listing.userRef ===user._id)

  const onSubmit = async () => {
    try {

      const userData = {
        email,
        name,
      }
  
      dispatch(updateUser(userData))
      
    } catch (error) {
      console.log(error)
      toast.error('Could not update profile details')
    }
  }

  const onChange = (e)=>{
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }))
  }

  if (isLoading) {
    return <Spinner />
  }

  return  <div className='profile'>
  <main>
  <div className='profileDetailsHeader'>
          <p className='profileDetailsText'>Personal Details</p>
          <p
            className='changePersonalDetails'
            onClick={() => {
              changeDetails && onSubmit()
              setChangeDetails((prevState) => !prevState)
            }}
          >
            {changeDetails ? 'done' : 'change'}
          </p>
        </div>
        <div className='profileCard'>
          <form>
            <input
              type='text'
              id='name'
              className={!changeDetails ? 'profileName' : 'profileNameActive'}
              disabled={!changeDetails}
              value={name}
              onChange={onChange}
            />
            <input
              type='text'
              id='email'
              className={!changeDetails ? 'profileEmail' : 'profileEmailActive'}
              disabled={!changeDetails}
              value={email}
              onChange={onChange}
            />
          </form>
        </div>

        <Link to='/create-listing' className='createListing'>
          <img src={homeIcon} alt="home"/>
          <p>Sell or rent your home</p>
          <img src={arrowRight} alt="arrow right"/>
        </Link>
        {!isLoading && filterListings?.length > 0 && (
          <>
            <p className='listingText'>Your Listings</p>
            <ul className='listingsList'>
            {filterListings.map((filterListing) => (
                <ListingItem
                listing={filterListing}
                id={filterListing._id}
                key={filterListing._id}
                onDelete={() => onDelete(filterListing._id)} 
                />
              ))}
            </ul>
          </>
        )}
  </main>
  </div>
}

export default Profile
