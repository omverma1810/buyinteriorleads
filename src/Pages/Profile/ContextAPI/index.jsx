import React, { createContext, useState, useEffect } from "react";

// Create a context
export const DataContext = createContext();

// Data Provider Component
export const DataProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [Profile, setProfile] = useState(null);
  const [Address, setAddress] = useState(null);



  // Fetch data from APIs
  useEffect(() => {

    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
      console.log("Access token is not available");
      return;
    }
    const fetchData = async () => {
        
      try {
        // Fetch orders
        const ordersResponse = await fetch(
          "https://buyinteriorapp-d0adf77e7c33.herokuapp.com/api/orders/"
        );
        const ordersData = await ordersResponse.json();
        setOrders(ordersData);

        const wishlistResponse = await fetch(
          "https://buyinteriorapp-d0adf77e7c33.herokuapp.com/api/wishlists/",
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

        // Fetch cart
        const cartResponse = await fetch(
          "https://buyinteriorapp-d0adf77e7c33.herokuapp.com/api/cart/",
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

        // Fetch Profile
        const ProfileResponse = await fetch(
          "https://buyinteriorapp-d0adf77e7c33.herokuapp.com/api/profile/",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
          }
        );
        console.log("response", ProfileResponse);
        const ProfileData = await ProfileResponse.json();
        setProfile(ProfileData);

        // Fetch Addresses
        const AddressResponse = await fetch(
          "https://buyinteriorapp-d0adf77e7c33.herokuapp.com/api/addresses/",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
          }
        );
        console.log("response", AddressResponse);
        const AddressData = await AddressResponse.json();
        setAddress(AddressData);

        const WishListResponse = await fetch(
          "https://buyinteriorapp-d0adf77e7c33.herokuapp.com/api/wishlists/",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
          }
        );
        console.log("response", WishListResponse);
        const WishListData = await WishListResponse.json();
        setAddress(WishListData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <DataContext.Provider
      value={{ orders, wishlist, cart, loading, error, Profile , Address}}
    >
      {children}
    </DataContext.Provider>
  );
};
