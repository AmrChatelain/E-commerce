import React, { useContext, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'
import API from '../config';


function SearchTool() {
 const {search, setSearch, showSearch, setShowSearch}= useContext(ShopContext);

 const location = useLocation();
 const [visible,setVisible]=useState(false); // FIXED: Added initial value

 useEffect(()=>{
  if(location.pathname.includes('Collection')){
    setVisible(true);
  }else{
    setVisible(false);
  }
 },[location])

  return showSearch && visible ? (
    <div className='bg-blend-overlay text-center'>
        <div className='inline-flex items-center justify-center border border-gray-400 px-5 py-2 my-5 mx-3 rounded-full w-3/4 sm:w-1/2'>
         <input 
           value={search} 
           onChange={(e)=>setSearch(e.target.value)} 
           className='flex-1 outline-none bg-inherit text-sm' 
           type="text" 
           placeholder='Search' 
         />
         <img className='w-4' src={`${API}/uploads/search_icon.png`} alt="search" />
        </div>

        <img 
          onClick={()=> setShowSearch(false)} 
          className='inline w-3 cursor-pointer' 
          src={`${API}/uploads/cross_icon.png`} 
          alt="close"
        />
      
    </div>
  ) : null
}

export default SearchTool