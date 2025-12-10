import React from 'react'
import Titles from '../components/Titles'
import API from '../config'

function about() {
  return (
    <div>
      <div className='text-2xl text-center pt-8 border-t'>
        <Titles t1={'About'} t2={'US'} />
        <div className='my-10 flex flex-col md:flex-row gap-17'>
          <img className='w-full md:max-w-[450px]' src={`${API}/uploads/about_img.jpg`} />
          <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
          <p>At Black Diamond, we believe fashion is more than clothing — it’s expression, confidence, and the art of presenting your best self.
            Our mission is to bring you thoughtfully curated pieces that blend modern style, comfort, and everyday luxury.</p>
          <p>From timeless essentials to standout statement outfits, each item in our collection is selected with care, intention, and an eye for detail.

          We’re passionate about quality, design, and creating clothes that feel as good as they look.
          Whether you’re dressing for a special moment or elevating your daily style, we’re here to make every choice feel effortless.</p>
            <b className='text-gray-700 text-start'> Our Purpose :</b>
            <p>Our mission is to offer clothing that combines reliable quality with modern design.
               We want every customer to enjoy a smooth shopping experience and find pieces they genuinely love and feel good wearing.</p>
          </div>

        </div>

      </div>
      
    </div>
  )
}

export default about
