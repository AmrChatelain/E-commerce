import { createContext, useEffect, useState } from "react";
import axios from "axios";
import API from "../config"; // your backend URL constant

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const [products, setProducts] = useState([]);

  const currency = '€';
  const delivery_fee = 15;

  const [search,setSearch]= useState('');
  const [showSearch,setShowSearch]= useState(false)

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
    search,setSearch,showSearch,setShowSearch,          // use this for image URLs
    fetchProducts // optional, if you want to refresh products manually
};

  return (
    <ShopContext.Provider value={value}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
