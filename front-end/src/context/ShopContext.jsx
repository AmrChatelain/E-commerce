import { createContext, useEffect, useState } from "react";
import axios from "axios";
import API from "../config"; // your backend URL constant
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const [products, setProducts] = useState([]);

  const currency = '€';
  const delivery_fee = 15;

  const [search,setSearch]= useState('');
  const [showSearch,setShowSearch]= useState(false)

  const [cartItems,setCartItems]=useState({});
  const navigate = useNavigate();

  const addToCart = (itemId,size)=>{

    if(!size){
    toast.error('Please Select Product Size');
    return;
    }else{
      toast.success('This Product Has Been Added To Your Cart!');
    }

    let cartData= structuredClone(cartItems);

    if(cartData[itemId]){
      if(cartData[itemId][size]){
        cartData[itemId][size] +=1;
      }
      else{
        cartData[itemId][size]= 1;
      }
    }else{
      cartData[itemId]={};
      cartData[itemId][size]= 1;
    }

    setCartItems(cartData);

  }


 {/* making sure the logic is working

  useEffect(()=>{
    console.log(cartItems);

  },[cartItems])

   */}
  
   const getCartCount= () =>{
    let totalCount= 0;
    for(const items in cartItems){
      for(const item in cartItems[items]){
        try {
          if (cartItems[items][item]> 0){
            totalCount += cartItems[items][item];
          }
        } catch (error) {
          
        }
      }
    }
    return totalCount;
   }

   const updateQuantity = (itemId,size,quantity)=>{

    let cartData=structuredClone(cartItems);

    cartData[itemId][size]=quantity

    setCartItems(cartData);

   }

   const getCartAmount = ()=>{
    let totalAmount = 0;
    for(const items in cartItems){
      let itemInfo = products.find((product)=> product._id === items);
      for(const item in cartItems[items]){

        try {
          if(cartItems[items][item] >0){
             totalAmount += itemInfo.price * cartItems[items][item];
          }
        } catch (error) {
          
        }
      }
    }
    return totalAmount
   }


  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${API}/products`);
      setProducts(res.data);
    } catch (err) {
      console.error("Failed to fetch products:", err);
    }
  };

  // Fetch once when context loads
  useEffect(() => {
    fetchProducts();
  }, []);

  const value = {
    products,
    currency,
    delivery_fee,
    API,
    cartItems,
    addToCart,
    getCartCount,
    updateQuantity,
    getCartAmount,
    navigate,
    search,setSearch,showSearch,setShowSearch,          // this for image URLs
    fetchProducts // optional, if you want to refresh products manually
};

  return (
    <ShopContext.Provider value={value}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
