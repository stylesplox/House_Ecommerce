import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Header from './components/Header'
import Explore from './pages/Explore'
import Login from './pages/Login'
import Register from './pages/Register'
import Profile from './pages/Profile'
import Offers from './pages/Offers'
import Category from './pages/Category'
import Listing from './pages/Listing'
import CreateListing from './pages/CreateListing'
import Contact from './pages/Contact'
import PrivateRoute from './components/PrivateRoute'
//import CreateListing from './pages/CreateListing'

function App() {
  return (
    <>
      <Router>
        <div className='container'>
          <Header />
          <Routes>
            <Route path='/' element={<Explore />}/>
            <Route path='/login' element={<Login />}/>
            <Route path='/register' element={<Register />}/>

            <Route path='/profile' element={<PrivateRoute />}>
            <Route path='/profile' element={<Profile />}/>
            </Route>

            <Route path='/offers' element={<Offers />}/>


            <Route path='/category/:categoryName' element={<Category />} />

            <Route path='/category/:categoryName/:listingId' element={<PrivateRoute />} >
            <Route path='/category/:categoryName/:listingId' element={<Listing />} />
            </Route>


            <Route path='/create-listing' element={<PrivateRoute />} >
            <Route path='/create-listing' element={<CreateListing />} />
            </Route>

            <Route path='/contact/:landlordId' element={<PrivateRoute />} >
            <Route path='/contact/:landlordId' element={<Contact />} />
            </Route>

          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
