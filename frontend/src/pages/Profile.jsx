//import {getAuth} from 'firebase/auth'
import {useState} from 'react'
import {Link} from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
//import { db } from '../firebase.config'
//import {updateDoc, doc} from 'firebase/firestore'
import { toast } from 'react-toastify'
import arrowRight from '../assets/svg/keyboardArrowRightIcon.svg'
import homeIcon from '../assets/svg/homeIcon.svg'
import { updateUser } from '../features/auth/authSlice'

function Profile() {
  /*
  const auth = getAuth()
  const [changeDetails, setChangeDetails] = useState(false)
  
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  })

  const { name, email } = formData
 
  const navigate = useNavigate()
  

  const onSubmit = async () => {
    try {
      if (auth.currentUser.displayName !== name) {
        // Update display name in fb
        

        // Update in firestore
        const userRef = doc(db, 'users', auth.currentUser.uid)
        await updateDoc(userRef, {
          name,
        })
      }
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
  */


  const { user } = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  const [username] = useState(user.name)
  const [useremail] = useState(user.email)
  const [changeDetails, setChangeDetails] = useState(false)

  const [formData, setFormData] = useState({
    name: username,
    email: useremail,
  })


  const { name, email } = formData


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
  </main>
  </div>
}

export default Profile
