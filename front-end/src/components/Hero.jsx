import React from 'react'
import  API  from '../config'


function Hero() {
  return (
    
    <div className='flex flex-col sm:flex-row border border-gray-400 mt-13 hero-container'>
      <div className='w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0 min-h-[100px] hero-text'>

        <div className='text-[#414141]'>
            <div className='flex items-center justify-center gap-2'>

                <p className='w-8 md:w-11 h-0.5 bg-[#414141]'></p>
                <p className='font-medium text-sm md:text-base'>The Standout Collection</p>

            </div>

            <h1 className='lora text-3xl sm:py-3 lg:text-5xl leading-relaxed hero-title text-center' data-hover-text="Where Style Finds Its Edge">
              Crafted for Those Who Stand Apart
            </h1>
            <div className='flex items-center justify-center gap-2'>
                <p className='font-semibold text-sm md:text-base'>Explore Pieces</p>
                <p className='w-8 md:w-11 h-0.5 bg-[#414141]'></p>

            </div>

        </div>

       </div> 
       <div className='hero-main w-full sm:w-1/2'>
         <img src={`${API}/uploads/hero_img.jpg`}  />
       </div>
      
    </div>
    
  )
}

export default Hero