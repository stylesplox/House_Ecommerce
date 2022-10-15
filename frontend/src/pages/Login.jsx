import { useState, useEffect } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { FaSignInAlt } from 'react-icons/fa'
import {useSelector, useDispatch} from 'react-redux'
import {login, reset} from '../features/auth/authSlice'
import { toast } from 'react-toastify'
import { ReactComponent as ArrowRightIcon } from '../assets/svg/keyboardArrowRightIcon.svg'
import Spinner from '../components/Spinner'




function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const { email, password } = formData

  const dispatch = useDispatch()
  const navigate = useNavigate();

const {user, isLoading, isError, isSuccess, message } = useSelector(state => state.auth)
useEffect(() => {
  if (isError) {
    toast.error(message)
  }

  // Redirect when logged in
  if (isSuccess || user) {
    navigate('/')
  }

  dispatch(reset())
}, [isError, isSuccess, user, message, navigate, dispatch])


  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault()

    const userData = {
      email,
      password,
    }
    console.log(userData)
  

    dispatch(login(userData))



  }

  
  if(isLoading){
    return <Spinner />
  }




 

  return (
    <>
      <div className='pageContainer'>
        <header>
          <p className='pageHeader'>Welcome Back!</p>
        </header>

        <form onSubmit={onSubmit}>
         
            <input
              type='email'
              className='emailInput'
              id='email'
              name='email'
              value={email}
              onChange={onChange}
              placeholder='Enter your email'
              required
            />
        
          <div className='passwordInputDiv'>
            <input
              type='password'
              className='passwordInput'
              id='password'
              name='password'
              value={password}
              onChange={onChange}
              placeholder='Enter password'
              required
            />
          </div>
          
          <div className='signInBar'>
            <p className='signInText'>Sign In</p>
            <button className='signInButton'>
              <ArrowRightIcon fill='#ffffff' width='34px' height='34px' />
            </button>
          </div>
        </form>

        <Link to='/register' className='registerLink'>
          Sign Up Instead
        </Link>
        </div>
    </>
  )
}

export default Login