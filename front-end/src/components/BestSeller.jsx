import React, { useContext, useEffect, useState } from 'react'
import {ShopContext} from '../context/ShopContext'
import Titles from './Titles';
import ProductItems from './ProductItems';

const BestSeller=() => {

    const {products, API}= useContext(ShopContext);
    const [bestSeller,setBestSeller] = useState([]);

  useEffect(()=>{
    if (products && products.length > 0) {
      console.log('Processing products:', products.length);
      const bestProduct = products.filter((item) => item.bestSeller === true);
      setBestSeller(bestProduct.slice(0, 5));
    }
  },[products])

  return (
    <div className='my-10'>
        <div className='text-center text-3xl py-8'>
            <Titles t1={'Signature'} t2={'Pieces'}  />
            <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
            Thoughtfully crafted styles made to elevate every moment.</p>
        </div>

        {/* Show loading while products fetch */}
        {products.length === 0 ? (
          <div className='text-center py-10 text-gray-500'>Loading products...</div>
        ) : bestSeller.length === 0 ? (
          <div className='text-center py-10 text-gray-500'>No best sellers available</div>
        ) : (
          <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-5'>
            {bestSeller.map((item)=>(
              <ProductItems  
                key={item._id} 
                id={item._id}
                image={`${API}${item.image[0]}`}
                name={item.name}
                price={item.price}
              />
            ))}
          </div>
        )}
    </div>
  )
}

export default BestSeller