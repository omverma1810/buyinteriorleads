import React, { createContext, useState, useEffect } from "react";

import { useAuth } from "../AuthContext";



// Create a context
export const DataContext = createContext();

// Data Provider Component
export const DataProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [cart, setCart] = useState([]);
  const [leads , setAllLeads] = useState([])
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [Profile, setProfile] = useState(null);
  const [Address, setAddress] = useState(null);


  const { userId, accessToken } = useAuth();

  console.log('usercred', userId , accessToken)


  const [AllLeads, setLeads] = useState([]);

  const addLead = (newLeads) => {
    setLeads((prevLeads) => [...prevLeads, ...newLeads]);
  };

  const fetchData = async () => {
    if (!accessToken) {
      console.log("Access token is not available");
      return;
    }
    setLoading(true);
    try {
      //Fetch Leads
      const LeadsResponse = await fetch(
        `https://buyinteriorapp-ed1e9e8d81f4.herokuapp.com/api/leads/`
      );
      const LeadsData = await LeadsResponse.json();
      setAllLeads(LeadsData);


      // Fetch wishlist
      const wishlistResponse = await fetch(
        `https://buyinteriorapp-ed1e9e8d81f4.herokuapp.com/api/wishlists/?user_id=${userId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      const wishlistData = await wishlistResponse.json();
      setWishlist(wishlistData);

      // Fetch orders
      const OrdersResponse = await fetch(
        `https://buyinteriorapp-ed1e9e8d81f4.herokuapp.com/api/orders/?user_id=${userId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      const OrdersData = await OrdersResponse.json();
      setOrders(OrdersData);

      // Fetch cart
      const cartResponse = await fetch(
        `https://buyinteriorapp-ed1e9e8d81f4.herokuapp.com/api/cart/?user_id=${userId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      const cartData = await cartResponse.json();
      setCart(cartData);

      // Fetch profile
      const profileResponse = await fetch(
        `https://buyinteriorapp-ed1e9e8d81f4.herokuapp.com/api/profile/?user_id=${userId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      const profileData = await profileResponse.json();
      setProfile(profileData);

      const addressResponse = await fetch(
        `https://buyinteriorapp-ed1e9e8d81f4.herokuapp.com/api/addresses/?user_id=${userId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      const addressData = await addressResponse.json();
      setAddress(addressData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch data on component mount
useEffect(() => {
  if (accessToken && userId) {
    fetchData(); 
  }
}, [accessToken, userId]);

  return (
    <DataContext.Provider
      value={{
        orders,
        wishlist,
        cart,
        loading,
        error,
        Profile,
        Address,
        fetchData,
        addLead,
        AllLeads,
        setLeads,
        leads,
        setAllLeads,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
