import React from 'react'
import Titles from '../components/Titles'
import API from '../config'

function Contact() {
  return (
    <div>
      <div  className='text-center text-2xl pt-10 border-t'>
        <Titles t1={'Contact'} t2={'US'}/>

      </div>
      <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28'>
        <img className='w-full md:max-w-[480px]' src={`${API}/uploads/contact_img.png`} />
        <div className='flex flex-col justify-center items-start gap-6'>
          <p className='font-semibold text-xl text-gray-600'>Our Store</p>
          <p className='text-gray-500'>Place du Carrousel <br /> 75001 Paris, France </p>
          <p className='text-gray-500'>Tel: (+33)1234567 <br /> Email:contact@Black-Diamond.fr</p>
          <p className='font-semibold text-xl text-gray-600'>Careers at Diamond</p>
          <p className='text-gray-500'>Learn more about our teams and job openings.</p>
          <button className='border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500'>Explore Jobs</button>

        </div>
      </div>
    </div>
  )
}

export default Contact
