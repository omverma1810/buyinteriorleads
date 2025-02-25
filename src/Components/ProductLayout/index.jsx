import { useState } from "react";
import { motion } from "framer-motion";
import { CiLocationOn } from "react-icons/ci";
import { BsBorderWidth } from "react-icons/bs";
import { CgOverflow } from "react-icons/cg";
import { IoCartOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { CiHeart } from "react-icons/ci";
import "./index.css"; 

export default function ProductDisplay({ products }) {
  const [preview, setPreview] = useState(null);
  const [liked, setLiked] = useState(false);
  const navigate = useNavigate();

  const handleClick = (product) => {
    navigate("/PDP", { state: { product } });
  };


  const userId = localStorage.getItem("userId");
  const accessToken = localStorage.getItem("accessToken");

  const handleLikeSubmit = async (e) => {
    e.preventDefault();

    if (!userId || !accessToken) {
      alert("User is not authenticated. Please log in.");
      return;
    }

    try {
      const response = await fetch(
        "https://buyinteriorapp-d0adf77e7c33.herokuapp.com/api/wishlists/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify('adata'),
        }
      );

      if (response.ok) {
        alert("Lead Liked successfully!");
        setLiked(true)
        onClose(); 
      } else {
        const errorData = await response.json();
        alert(
          `Failed to save address (Error ${response.status}): ${errorData.message || "Unknown error"}`
        );
      }
    } catch (error) {
      alert("Error: " + error.message);
    }
  };

  return (
    <div className="product-display">
      <div className="product-grid">
        {products.map((product) => (
          <div
            key={product.id}
            onClick={() => handleClick(product)}
            className="product-card"
          >
            <img
              src="https://bookmyinteriorlead.com/wp-content/uploads/2020/11/NEW-WEBSITE-THEME-LEAD-IMAGE.jpg"
              alt={product.name}
              className="product-image"
            />
            <div className="product-details">
              <h2 className="product-name">
                {product.name} / {product.service_required_on} /{" "}
                {product.property_type}
              </h2>
              <div className="product-location">
                <CiLocationOn size={16} />
                <h4 className="location-text">{product.location}</h4>
              </div>
              <div className='like-P'>
                <div className="product-price">
                  <p className="discount-price">₹{product.discount_price}</p>
                  <p className="original-price">₹{product.price}</p>
                </div>
                <button onClick={handleLikeSubmit}><CiHeart color={liked ? "red" : "black"} size={20} /></button>

              </div>
              <div className="button-container">
                <button className="add-to-cart-button">
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
