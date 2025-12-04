import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { Link } from 'react-router-dom';

const ProductItems=({id, image, name, price})=> {

    const {currency} = useContext(ShopContext);
    
  return (
    <Link 
      to={`/product/${id}`} 
      className='text-gray-700 cursor-pointer block'
      style={{textDecoration: 'none', outline: 'none'}}
    >
        <div className='flex flex-col'>
            {/* Image Container - removed rounded-lg, added bg-white */}
            <div className='w-full aspect-[4/5] overflow-hidden bg-white'>
                <img 
                    src={image} 
                    alt={name}
                    className='w-full h-full object-cover transition-transform duration-300 hover:scale-105'
                />
            </div>

            {/* Product Name */}
            <h3 className='mt-2 text-gray-700 font-medium text-sm md:text-base'>
                {name}
            </h3>

            {/* Product Price */}
            <p className='text-gray-500 text-sm md:text-base'>
                {currency}{price}
            </p>
        </div>
    </Link>
  )
}

export default ProductItems