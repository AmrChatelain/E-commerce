import React, { useContext, useState } from 'react'
import Titles from '../components/Titles'
import CartTotal from '../components/cartTotal'
import API from '../config'
import { ShopContext } from '../context/ShopContext';

function PlaceOrder() {

  const [method,setMethod]=useState('cod');
  const {navigate}= useContext(ShopContext);
  return (
    <div className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t'>
      <div className='flex flex-col gap-4 w-full sm:max-w-[480px]'>
        <div className='text-xl sm:text-2xl my-3'>
          <Titles t1={'Delivery'} t2={'Information'} />

        </div>
        <div className='flex gap-3'>
          <input className='border border-gray-30 rounder py-1.5 px-4 w-full' type="text" placeholder='First Name'/>
          <input className='border border-gray-30 rounder py-1.5 px-4 w-full' type="text" placeholder='Last Name'/>
        </div>
        <input className='border border-gray-30 rounder py-1.5 px-4 w-full' type="email" placeholder='Email Address'/>
          <input className='border border-gray-30 rounder py-1.5 px-4 w-full' type="Number" placeholder='Phone number'/>
        <div className='flex gap-3'>
          <input className='border border-gray-30 rounder py-1.5 px-4 w-full' type="text" placeholder='Street Name'/>
           <input className='border border-gray-30 rounder py-1.5 px-4 w-full' type="text" placeholder='City'/>
         
        </div>
        <div className='flex gap-3'>
           <input className='border border-gray-30 rounder py-1.5 px-4 w-full' type="Number" placeholder='Zip Code'/>
           <input className='border border-gray-30 rounder py-1.5 px-4 w-full' type="text" placeholder='Country'/>
           
        </div>
         
          </div>
                {/* right side here*/}
          <div className='mt-8'>
             <div className='mt-8 min-w-80'>
            <CartTotal />
            </div>
            <div className='mt-12'>
            <Titles t1={'Payment'} t2={'Method'} />
            {/* making the payment */}
           <div className="flex flex-col gap-3 w-full">
            <div onClick={()=>setMethod('stripe')} className="flex items-center gap-3 border p-3 cursor-pointer w-full">
            <p className={`w-4 h-4 border rounded-full ${method === 'stripe' ? 'bg-green-500' : ''}`}></p>
              <img src={`${API}/uploads/stripe_logo.png`} className="h-6 object-contain" />
             </div>

            <div onClick={()=>setMethod('amex')} className="flex items-center gap-3 border p-3 cursor-pointer w-full">
             <p className={`w-4 h-4 border rounded-full ${method === 'amex' ? 'bg-green-500' : ''}`}></p>
            <img src={`${API}/uploads/amex-logo.png`} className="h-6 object-contain" />
            </div>

             <div onClick={()=>setMethod('cod')} className="flex items-center gap-3 border p-3 cursor-pointer w-full">
           <p className={`w-4 h-4 border rounded-full ${method === 'cod' ? 'bg-green-500' : ''}`}></p>
          <p className="text-gray-800 text-sm font-medium mx-4">Cash On Delivery</p>
           </div>
           </div>
           <div className='w-full text-center mt-8'>
            <button onClick={()=>navigate('/orders')} className='bg-black text-white px-16 py-3 text-sm'>Place Order</button>

           </div>

        </div>
        </div>
          
    </div>
  )
}

export default PlaceOrder
