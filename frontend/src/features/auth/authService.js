import axios from 'axios'

const API_URL = '/api/users/'
// Register user
const register = async (userData) => {
  const response = await axios.post(API_URL, userData)

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data))
  }
  return response.data
}

// Login user
const login = async (userData) => {

  const response = await axios.post(API_URL + 'login', userData)

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data))
  }

  localStorage.setItem('token',response.data['token'])
  
  return response.data
}




const updateUser = async (userData,token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const response = await axios.put(API_URL, userData,config)
  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data))
  }
  //let data =localStorage.getItem('user')
  
  
  /*data = data.map((value) => {
    // check if this is the value to be edited
    
         return {
              ...value,
              email: response['data']['email'],
              name: response['data']['name']
         }
    
    // otherwise return the original value without editing
})
*/

  return response.data
}

const getUser = async (userData,token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  console.log(userData)
  console.log('lol')
  const response = await axios.get(API_URL + 'me/'+ userData,config)
  return response.data
}

// Logout user
const logout = () => localStorage.removeItem('user')

const authService = {
  register,
  logout,
  login,
  updateUser,
  getUser,
}

export default authService