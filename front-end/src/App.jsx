import React from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import Collection from './pages/Collection'
import About from './pages/About'
import Contact from './pages/Contact'
import Product from './pages/Product'
import Cart from './pages/Cart'
import Login from './pages/Login'
import PlaceOrder from './pages/PlaceOrder'
import Orders from './pages/Orders'
import Navbar from './components/Navbar'
import SearchTool from './components/SearchTool'
import AdminPage from './components/AdminPage'


function App() {
  return (
   <div className='page-container px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
     <Navbar />
     <SearchTool />
    <Routes>
       <Route path='/' element={<Home />} />
       <Route path='/collection' element={<Collection />} />
       <Route path='/about' element = {<About />} />
       <Route path='/contact' element={<Contact/>} />
       <Route path='/product/:productId' element= {<Product/>} />
       <Route path='/cart' element={<Cart />} />
       <Route path='/login' element= {<Login />} />
       <Route path='placeOrder' element= {<PlaceOrder />} />
       <Route path='orders' element= {<Orders />} />
       <Route path="/admin/products" element={<AdminPage />} />


    </Routes>

    </div>
  )
}

export default App
