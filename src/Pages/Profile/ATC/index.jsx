import React, { useContext } from "react";
import { DataContext } from "../../../ContextAPI";
import "./index.css";

import { useNavigate } from "react-router-dom";

import ProductDisplay from "../../../Components/ProductLayout";
import {useAuth} from '../../../AuthContext'

const WishList = () => {

  const navigate = useNavigate(); 
  const { loading, error, cart, addLead, AllLeads } = useContext(DataContext);
  const {userId} = useAuth()



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
      {cart.length === 0 ? (
        <div className="empty-state-wishlist">
          <h3 className="empty-title-wishlist">No Leads found</h3>
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
        <ProductDisplay products={cart} />
      )}
      <div style={{margin:10 , display:'flex', justifyContent:'flex-end'}}>
        <button onClick={handleBuyNow} className="btn-PDP">
          Buy Now
        </button>
      </div>
    </div>
  );
};

export default WishList;
