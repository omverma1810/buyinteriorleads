import React, { useContext } from "react";
import { DataContext } from "../../../ContextAPI";
import "./index.css";

import ProductDisplay from "../../../Components/ProductLayout";

const WishList = () => {
  const { wishlist, loading, error, orders, cart  } = useContext(DataContext);

  console.log("check", wishlist.length);


  //  const handleDelete = async ( productId) => {
  //    e.preventDefault();
  //    e.stopPropagation();

  //    if (!userId || !accessToken) {
  //      alert("User is not authenticated. Please log in.");
  //      return;
  //    }

  //    const payload = { user_id: userId, lead_id: productId };

  //    try {
  //      const response = await fetch(
  //        `https://buyinteriorapp-ed1e9e8d81f4.herokuapp.com/api/wishlists/?user_id=${userId}`,
  //        {
  //          method: "POST",
  //          headers: {
  //            "Content-Type": "application/json",
  //            Authorization: `Bearer ${accessToken}`,
  //          },
  //          body: JSON.stringify(payload),
  //        }
  //      );

  //      if (response.ok) {
  //        alert("Lead Liked successfully!");
  //        setLikedProducts((prevLikedProducts) => {
  //          const newLikedProducts = new Set(prevLikedProducts);
  //          if (newLikedProducts.has(productId)) {
  //            newLikedProducts.delete(productId);
  //          } else {
  //            newLikedProducts.add(productId);
  //          }
  //          return newLikedProducts;
  //        });
  //        fetchData();
  //      } else {
  //        const errorData = await response.json();
  //        alert(
  //          `Failed to save Lead (Error ${response.status}): ${
  //            errorData.message || "Unknown error"
  //          }`
  //        );
  //      }
  //    } catch (error) {
  //      alert("Error: " + error.message);
  //    }
  //  };




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
        <ProductDisplay products={wishlist} showDeleteButton={true} />
      )}
    </div>
  );
};

export default WishList;
