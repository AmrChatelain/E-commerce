import React, { useContext, useEffect, useState } from 'react'
import API from '../config'
import { ShopContext } from '../context/ShopContext'
import Titles from '../components/Titles'
import ProductItem from '../components/ProductItems'

function RelatedProducts({category, subCategory}) {

  const {products} = useContext(ShopContext);
  const [related,setRelated]= useState([]);

  useEffect(()=>{
    if(products.length >0 ){
      let productsCopy = products.slice();
      productsCopy= productsCopy.filter((item)=> category === item.category);

      productsCopy=productsCopy.filter((item)=> subCategory === item.subCategory);

      setRelated(productsCopy.slice(0,5));
    }


  },[products])

  return (
    <div className='my-24'>
    <div className='text-center text-3xl py-2'>
      <Titles t1={"Related"} t2={"Products"} />
    </div>
    <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
      {related.map((item,index)=>(
       <ProductItem key={item._id || index} id={item._id} price={item.price} image={`${API}${item.image[0]}`} />
      ))}
    </div>
    </div>
    
  )
}

export default RelatedProducts
