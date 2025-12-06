import React, { useContext, useState, useEffect } from 'react'
import { ShopContext } from '../context/ShopContext'
import API from '../config';
import Titles from '../components/Titles'
import ProductItems from '../components/ProductItems'


function Collection() {

  const {products, search, showSearch }= useContext(ShopContext);
  const [showFilter,setShowFiler]= useState(false);
  const [filterProducts,setFilterProducts]=useState([]);
  const [category,setCategory]=useState([]);
  const [subCategory,setSubCategory]=useState([]);
  const [sortType,setSortType]=useState('relavent');

  const toggleCategory = (e)=>{
    if (category.includes(e.target.value)){
      setCategory(p => p.filter(item=> item !== e.target.value))
    }else{
      setCategory(p =>[...p,e.target.value])
    }
  }

  const toggleSubCategory =(e) =>{
    if(subCategory.includes(e.target.value)){
      setSubCategory(p => p.filter(item => item !== e.target.value))
    }else{
      setSubCategory(p => [...p,e.target.value])
    }
  }

  // Apply filters whenever category, subCategory, or products change
  const applyFilter = () => {
    let productsCopy = products.slice();

    // Filter by category
    if (category.length > 0) {
      productsCopy = productsCopy.filter(item => category.includes(item.category));
    }

    // For the search bar
    if(showSearch && search){
      productsCopy= productsCopy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()))

    }

    // Filter by subcategory
    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter(item => subCategory.includes(item.subCategory));
    }

    setFilterProducts(productsCopy);
  }

  // Sort products
  const sortProduct = () => {
    let filterProd = filterProducts.slice();

    switch(sortType) { // FIXED: Check sortType, not filterProd
      case 'low-high':
        setFilterProducts(filterProd.sort((a,b) => (a.price - b.price)));
        break;
      case 'high-low': // FIXED: Typo was "hight-low"
        setFilterProducts(filterProd.sort((a,b) => (b.price - a.price)));
        break;
      default:
        applyFilter();
        break;
    }
  };

  // Run filter whenever category, subCategory, or products change
  useEffect(() => {
    applyFilter();
  }, [category, subCategory, products, search, showSearch])

  // Run sort whenever sortType or filterProducts changes
  useEffect(() => {
    sortProduct();
  }, [sortType])

  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>

      <div className='min-w-60'>
        <p onClick={()=> setShowFiler(!showFilter)} className='my-2 text-x1 flex items-center cursor-pointer gap-2'>FILTER
          <img className={`h-3 sm:hidden ${showFilter ? 'rotate-90' : ''}`} src={`${API}/uploads/dropdown_icon.png`} alt="dropdown" />
        </p>
        <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '' : 'hidden'} sm:block`}>
          <p className='mb-3 text-sm font-medium'>Categories</p>

          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Men'} onChange={toggleCategory} /> Men
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Women'} onChange={toggleCategory} /> Woman
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Kids'} onChange={toggleCategory} /> Children
            </p>

          </div>
        </div>
        <div className={`border border-gray-300 pl-4.5 py-3 my-5  ${showFilter ? '' : 'hidden'} sm:block`}>
          <p className='mb-3 text-sm font-medium'>Type</p>

          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Topwear'} onChange={toggleSubCategory} />Elevated Tops
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Bottomwear'} onChange={toggleSubCategory} /> Trousers & Bottoms
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Winterwear'} onChange={toggleSubCategory} /> Cold-Season Essentials
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Sets'} onChange={toggleSubCategory} /> Sets
            </p>

          </div>

        </div>
      </div>

      <div className='flex-1'>
        <div className='flex justify-between text-base sm:text-2xl mb-4'>

          <Titles t1={'Our'} t2={'Collections'} />

          {/*sort products */}
          <select 
            onChange={(e) => setSortType(e.target.value)} 
            className='border-2 border-gray-300 text-sm px-2'
            value={sortType}
          >
            <option value="relavent">Sort by: Relavent</option>
            <option value="low-high">Sort by: Low to High</option>
            <option value="high-low">Sort by: High to Low</option>
          </select>

        </div>

        {/*display all */}

        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>

          {filterProducts && filterProducts.length > 0 ? (
            filterProducts.map((item)=>(
              <ProductItems 
                key={item._id} 
                id={item._id}
                image={`${API}${item.image[0]}`}
                name={item.name}
                price={item.price}
              />
            ))
          ) : (
            <p className='col-span-full text-center text-gray-500 py-10'>No products found</p>
          )}

        </div>

      </div>

    </div>
    
  )
}

export default Collection