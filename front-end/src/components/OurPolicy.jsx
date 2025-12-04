import React from 'react'
import API from '../config'

const OurPolicy= ()=> {
  return (
    <div className='flex flex-col sm:flex-row justify-around gap-12 sm:gap-2 text-center py-20 text-xs sm:text-sm md:text-base text-gray-700'>
      <div>
        <img src={`${API}/uploads/exchange_icon.png`} alt="exchange" className='w-12 m-auto mb-5' />
        <p className='font-semibold'>To ensure the best experience, we offer exchanges within 14 days of receiving your order.
         Returned items must be in perfect condition, unworn, unwashed, and complete with original packaging and tags.</p>
        <p className='text-gray-400'>Once approved, we’ll issue your exchange or store credit.
          Please note that special-priced pieces and accessories are final sale.</p>
      </div>
      <div>
        <img src={`${API}/uploads/quality_icon.png`} alt="exchange" className='w-12 m-auto mb-5' />
        <p className='font-semibold'>Every piece in our collection is crafted with care, using thoughtfully selected materials and precise workmanship.
         We inspect each item before shipping to ensure it meets our quality standards.</p>
        <p className='text-gray-400'>If you receive a product that does not reflect the quality we promise,
         please contact us within 48 hours of delivery so we can assist you promptly.</p>
      </div>
      <div>
        <img src={`${API}/uploads/support_img.png`} alt="exchange" className='w-12 m-auto mb-5' />
        <p className='font-semibold'>Our team is here to assist you with any questions regarding your order, sizing,
         exchanges, or product details.</p>
        <p className='text-gray-400'>You can reach us anytime through our support channels,
             and we aim to respond within 24–48 hours.</p>
      </div>
    </div>
  )
}

export default OurPolicy
