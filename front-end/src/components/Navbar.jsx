import React, { useContext, useState } from 'react'
import API from '../config'
import { Link, NavLink } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext';

function Navbar() {

  const [visible,setVisible]= useState(false);

  const {setShowSearch, getCartCount}= useContext(ShopContext);

  return (
    <div className='flex items-center justify-between py-5 font-bold'>
       <Link to='/'> <img src={`${API}/uploads/logo.png`} className="w-36" /> </Link>

       <ul className='hidden sm:flex items-center gap-6 text-lg text-gray-700 uppercase tracking-wide'>
        <NavLink to='/' className='flex flex-col items-center gap-1 transition-colors duration-200 hover:text-black' >
            <p>HOME</p>
            <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />

        </NavLink>
        <NavLink to='/Collection' className='flex flex-col items-center gap-1 transition-colors duration-200 hover:text-black' >
            <p>COLLECTION</p>
            <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />

        </NavLink>
        <NavLink to='/About' className='flex flex-col items-center gap-1 transition-colors duration-200 hover:text-black' >
            <p>ABOUT</p>
            <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />

        </NavLink>
        <NavLink to='/Contact' className=' flex flex-col items-center gap-1 transition-colors duration-200 hover:text-black' >
            <p>CONTACT</p>
            <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />

        </NavLink>

       </ul>

       <div className='flex items-center gap-6'>
        <img onClick={()=>setShowSearch(true)} src={`${API}/uploads/search_icon.png`} className="w-6 cursor-pointer" alt='search' />
        <div className='relative group'>
          <img
             src={`${API}/uploads/profile_icon.png`} className="w-6 cursor-pointer" alt='profile'/>
           <div className='hidden group-hover:block absolute right-0 pt-4'>
            <div className='flex flex-col gap-2 w-36 py-3 px-5 bg-slate-200 text-gray-500 rounded'>
               <p className='cursor-pointer hover:text-black'>My Profile</p>
               <p className='cursor-pointer hover:text-black'>Others</p>
               <p className='cursor-pointer hover:text-black'>Logout</p>
                </div>

            </div>

        </div>
         <Link to='/Cart' className=' relative'>
         <img src={`${API}/uploads/cart_icon.png`} className="w-6 min-w-5 " alt='Cart' />
         <p className=' absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]'>{getCartCount()}</p>
         </Link>
         <img onClick={()=>setVisible(true)} src={`${API}/uploads/menu_icon.png`} className="w-5 cursor-pointer sm:hidden" />
       </div>
      {/*setting menu for small screens */}
    <div className={` absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${visible ? 'w-full' : 'w-0'}`}>
         <div className=' flex flex-col text-gray-500'>
            <div onClick={()=> setVisible(false)} className=' flex items-center gap-4 p-3 cursor-pointer'>
                <img className='h-4 rotate-180' src={`${API}/uploads/dropdown_icon.png`} />
                <p>Back</p>

            </div>
            <NavLink onClick={()=> setVisible(false)} className=' py-2 pl-6 border' to='/'>HOME</NavLink>
            <NavLink onClick={()=> setVisible(false)} className=' py-2 pl-6 border' to='/Collection'>COLLECTION</NavLink>
            <NavLink onClick={()=> setVisible(false)} className=' py-2 pl-6 border' to='/About'>ABOUT</NavLink>
            <NavLink onClick={()=> setVisible(false)} className=' py-2 pl-6 border' to='/Contact'>CONTACT</NavLink>

         </div>

      </div>
    </div>
  )
}

export default Navbar
