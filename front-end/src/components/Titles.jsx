import React from 'react'

const Titles=({t1,t2}) => {
  return (
    <div className='inline-flex gap-2 items-center mb-3'>
        <p className=' text-gray-500'>{t1} <span className='text-gray-700 font-medium'>{t2}</span></p>
        <p className='w-8 sm:w-12 h-px sm:h-0.5 bg-gray-700'></p>
      
    </div>
  )
}

export default Titles
