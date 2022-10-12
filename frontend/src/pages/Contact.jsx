import { useState, useEffect } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useSelector, useDispatch } from 'react-redux'
import { getUser } from '../features/auth/authSlice'


function Contact() {
  const { landlord,isError,message } = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  const [mailmessage, setMailMessage] = useState('')
  // eslint-disable-next-line
  const [searchParams, setSearchParams] = useSearchParams()
  //console.log(landlord)
  const params = useParams()

  useEffect(() => {
    if(isError){
      toast.error(message)
  }
  dispatch(getUser(params.landlordId))

  }, [params.landlordId,dispatch,isError,message])

  const onChange = (e) => setMailMessage(e.target.value)

  return (
    <div className='pageContainer'>
      <header>
        <p className='pageHeader'>Contact Landlord</p>
      </header>

      {landlord !== null && (
        <main>
          <div className='contactLandlord'>
            <p className='landlordName'>Contact {landlord?.name}</p>
          </div>

          <form className='messageForm'>
            <div className='messageDiv'>
              <label htmlFor='message' className='messageLabel'>
                Message
              </label>
              <textarea
                name='message'
                id='message'
                className='textarea'
                value={mailmessage}
                onChange={onChange}
              ></textarea>
            </div>

            <a
              href={`mailto:${landlord.email}?Subject=${searchParams.get(
                'listingName'
              )}&body=${mailmessage}`}
            >
              <button type='button' className='primaryButton'>
                Send Message
              </button>
            </a>
          </form>
        </main>
      )}
    </div>
  )
}

export default Contact