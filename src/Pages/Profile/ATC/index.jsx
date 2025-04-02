import React, { useContext } from "react";
import { DataContext } from "../../../ContextAPI";
import "./index.css";

import { useNavigate } from "react-router-dom";

import ProductDisplay from "../../../Components/ProductLayout";
import {useAuth} from '../../../AuthContext'

const WishList = () => {

  const navigate = useNavigate(); 
  const { loading, error, cart, addLead, AllLeads , fetchData } = useContext(DataContext);


   const { userId , accessToken} = useAuth();



   console.log('cart', cart)
  
  
     const handleDelete = async (productId) => {



      console.log(productId , 'in atc page')

  
       if (!userId || !accessToken) {
         alert("User is not authenticated. Please log in.");
         return;
       }
  
  
       try {
         const response = await fetch(
           `https://buyinteriorapp-ed1e9e8d81f4.herokuapp.com/api/cart/?user_id=${userId}&lead_id=${productId}`,
           {
             method: "DELETE",
             headers: {
               "Content-Type": "application/json",
               Authorization: `Bearer ${accessToken}`,
             },
           }
         );
  
         if (response.ok) {
           alert("Lead Deleted successfully!");
           fetchData();
         } else {
           const errorData = await response.json();
           alert(
             `Failed to save Lead (Error ${response.status}): ${
               errorData.message || "Unknown error"
             }`
           );
         }
       } catch (error) {
         alert("Error: " + error.message);
       }
     };



  console.log(AllLeads, "allleads")


  const handleBuyNow = () => {
    addLead(cart);
    if (userId) {
      navigate("/CheckOut");
    } else {
      navigate("/SignIn", { state: { from: "/CheckOut" } });
    }
  };
  return (
    <div className="Wishlist-conatiner">
      {cart && cart.length > 0 ? (
        <ProductDisplay
          products={cart}
          showDeleteButton={true}
          onDelete={handleDelete}
          source="cart"
        />
      ) : (
        <div className="empty-state-wishlist">
          <h3 className="empty-title-wishlist">No Leads found</h3>
          <p className="empty-description-wishlist">
            Add your first Lead to get started
          </p>
          <button className="add-button">Add New Leads</button>
        </div>
      )}
      <div style={{ margin: 10, display: "flex", justifyContent: "flex-end" }}>
        <button onClick={handleBuyNow} className="btn-PDP">
          Buy Now
        </button>
      </div>
    </div>
  );
};

export default WishList;
