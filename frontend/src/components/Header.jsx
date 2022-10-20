import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import { logout, reset } from '../features/auth/authSlice'
import {ReactComponent as OfferIcon} from '../assets/svg/localOfferIcon.svg'
import {ReactComponent as ExploreIcon} from '../assets/svg/exploreIcon.svg'
import {ReactComponent as PersonOutlineIcon} from '../assets/svg/personOutlineIcon.svg'



function Header() {
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)

  const onLogout = () => {
    dispatch(logout())
    dispatch(reset())
    navigate('/')
  }

  const pathMatchRoute = (route) => {
    if(route === location.pathname){
        return true;
    }
}

  return (
    <footer className='navbar'>
      <nav className='navbarNav'>
      <ul className='navbarListItems'>
      <div className='logo'>
        <Link to='/'>House Ecommerce</Link>
      </div>
      <li className='navbarListItem' onClick={() => navigate('/')}>
        <ExploreIcon
          fill={pathMatchRoute('/') ? '#2c2c2c' : '#8f8f8f'}
          width='36px'
          height='36px'
        />
        <p
          className={
            pathMatchRoute('/')
              ? 'navbarListItemNameActive'
              : 'navbarListItemName'
          }
        >
          Explore
        </p>
      </li>
      <li className='navbarListItem' onClick={() => navigate('/offers')}>
        <OfferIcon
          fill={pathMatchRoute('/offers') ? '#2c2c2c' : '#8f8f8f'}
          width='36px'
          height='36px'
        />
        <p
          className={
            pathMatchRoute('/offer')
              ? 'navbarListItemNameActive'
              : 'navbarListItemName'
          }
        >
          Offers
        </p>
      </li>
      {user ? (
        <ul className='navbarListItems'>
       
      <li className='navbarListItem' onClick={() => navigate('/profile')}>
        <PersonOutlineIcon
          fill={pathMatchRoute('/profile') ? '#2c2c2c' : '#8f8f8f'}
          width='36px'
          height='36px'
        />
        <p
          className={
            pathMatchRoute('/profile')
              ? 'navbarListItemNameActive'
              : 'navbarListItemName'
          }
        >
          Profile
        </p>
      </li>
          <li className='navbarListItem' onClick={onLogout}>
            <button className='btn'>
              <FaSignOutAlt   width='36px'
          height='36px' /> 
              <p>Logout</p>
            </button>
          </li>
          </ul>
        ) : (
          <>
            <ul className='navbarListItems'>
            <li className='navbarListItem'>
              <Link to='/login'>
                <FaSignInAlt   width='36px'
          height='36px'/> 
                <p>Login</p>
              </Link>
            </li>
            <li className='navbarListItem'>
              <Link to='/register'>
                <FaUser   width='36px'
          height='36px'/> 
                <p>Register</p>
              </Link>
            </li>
            </ul>
          </>
        )}
        
      </ul>
      </nav>
    </footer>
  )
}

export default Header