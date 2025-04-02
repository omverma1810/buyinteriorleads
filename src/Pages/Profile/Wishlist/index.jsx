import React, { useContext } from "react";
import { DataContext } from "../../../ContextAPI";
import "./index.css";

import ProductDisplay from "../../../Components/ProductLayout";

import { useAuth } from "../../../AuthContext";

const WishList = () => {
  const { wishlist, fetchData } = useContext(DataContext);

  const { userId , accessToken} = useAuth();


   const handleDelete = async (e, productId) => {

     if (!userId || !accessToken) {
       alert("User is not authenticated. Please log in.");
       return;
     }

     console.log('productID', productId)


     try {
       const response = await fetch(
         `https://buyinteriorapp-ed1e9e8d81f4.herokuapp.com/api/wishlists/${productId}/?user_id=${userId}`,
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




  return (
    <div className="Wishlist-conatiner">
      {wishlist.length === 0 ? (
        <div className="empty-state-wishlist">
          <h3 className="empty-title-wishlist">No Wishlists found</h3>
          <p className="empty-description-wishlist">
            Add your first Lead to get started
          </p>
          <button
            // onClick={() => setIsFormOpen(true)}
            className="add-button"
          >
            Add New Leads
          </button>
        </div>
      ) : (
        <ProductDisplay 
          products={wishlist}
          showDeleteButton={true}
          // onDelete={handleDelete}
          source="wishlist"
        />
      )}
    </div>
  );
};

export default WishList;
