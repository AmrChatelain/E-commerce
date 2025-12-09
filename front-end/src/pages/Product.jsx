import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext';
import API from '../config';
import RelatedProducts from '../components/RelatedProducts';

function Product() {

  const {productId} = useParams();
  const {products} = useContext(ShopContext);
  const [productData, setProductData] = useState(null); 
  const [image, setImage] = useState('');
  const [size, setSize] = useState('');

  // Define fetchProduct function
  const fetchProduct = async () => {
    if (!products || products.length === 0) return;

    // Find the product by ID
    const product = products.find((item) => item._id === productId);
    
    if (product) {
      setProductData(product);
      setImage(product.image[0]); // Set first image as default
    }
  }

  useEffect(() => {
    fetchProduct();
  }, [productId, products])

  // Show loading state while product data is being fetched
  if (!productData) {
    return <div className='text-center py-20'>Loading...</div>
  }

  return (
    <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100'>
      {/* Product Data */}
      <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row'>
        
        {/* Product Images */}
        <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
          <div className='flex sm:flex-col overflow-x-auto justify-between sm:justify-normal sm:w-[18.7%] w-full'>
            {productData.image.map((item, index) => (
              <img 
                onClick={() => setImage(item)} 
                src={`${API}${item}`} 
                key={index} 
                className='w-[24%] sm:w-full sm:mb-3 shrink-0 cursor-pointer' 
                alt={`Product ${index + 1}`}
              />
            ))}
          </div>
          <div className='w-full sm:w-[80%]'>
            <img className='w-full h-auto' src={`${API}${image}`} alt={productData.name} />
          </div>
        </div>

        {/* Product Info */}
        <div className='flex-1'>
          <h1 className='font-medium text-2xl mt-2'>{productData.name}</h1>
          <div className='flex items-center gap-1 mt-2'>
            <img src={`${API}/uploads/star_icon.png`} alt="" className="w-3.5" />
            <img src={`${API}/uploads/star_icon.png`} alt="" className="w-3.5" />
            <img src={`${API}/uploads/star_icon.png`} alt="" className="w-3.5" />
            <img src={`${API}/uploads/star_icon.png`} alt="" className="w-3.5" />
            <img src={`${API}/uploads/star_dull_icon.png`} alt="" className="w-3.5" />
            <p className='pl-2'>(122)</p>
          </div>
          <p className='mt-5 text-3xl font-medium'>€{productData.price}</p>
          <p className='mt-5 text-gray-500 md:w-4/5'>{productData.description}</p>
          
          {/* Select Size */}
          <div className='flex flex-col gap-4 my-8'>
            <p>Select Size</p>
            <div className='flex gap-2'>
              {productData.sizes.map((item, index) => (
                <button 
                  onClick={() => setSize(item)} 
                  className={`border py-2 px-4 bg-gray-100 ${item === size ? 'border-red-500' : ''}`} 
                  key={index}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <button className='bg-black text-white px-8 py-3 text-sm active:bg-gray-700'>
            ADD TO CART
          </button>
          
          <hr className='mt-8 sm:w-4/5' />
          
          <div className='text-sm text-gray-500 mt-5 flex flex-col gap-1'>
            <p>100% Original product.</p>
            <p>Cash on delivery is available on this product.</p>
            <p>Easy return and exchange policy within 7 days.</p>
          </div>
        </div>

      </div>

      {/* Description & Reviews */}
      <div className='mt-20'>
        <div className='flex'>
          <b className='border px-5 py-3 text-sm'>Description</b>
          <p className='border px-5 py-3 text-sm'>Reviews (122)</p>
        </div>
        <div className='flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500'>
          <p>{productData.description}</p>
         
        </div>
         <RelatedProducts category={productData.category} subCategory={productData.subCategory} />
      </div>

    </div>
  )
}

export default Product