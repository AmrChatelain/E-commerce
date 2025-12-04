import React, { useContext, useState, useEffect } from 'react';
import { ShopContext } from '../context/ShopContext';
import Titles from './Titles';
import ProductItems from './ProductItems';
import API from '../config';

function LatestCollection() {
  const { products } = useContext(ShopContext);
  const [latestP, setLatestP] = useState([]);

  useEffect(() => {
    setLatestP(products.slice(0, 5));
  }, [products]);

  return (
    <div className='my-10'>
      {/* Section Title */}
      <div className='text-center py-8'>
        <Titles t1={'The New'} t2={'Collection'} />

        <p className='w-3/4 m-auto text-sm md:text-base text-gray-600'>
          Discover the newest arrivals, crafted for timeless elegance and modern living.
        </p>
      </div>

      {/* Products Grid */}
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
        {latestP.map((item) => (
          <ProductItems 
            key={item._id} 
            id={item._id}
            image={`${API}${item.image[0]}`}
            name={item.name}
            price={item.price}
          />
        ))}
      </div>
    </div>
  );
}

export default LatestCollection;