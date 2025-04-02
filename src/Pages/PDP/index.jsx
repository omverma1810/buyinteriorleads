import React, { useState , useContext } from "react";
import "./index.css";

import { useLocation } from "react-router-dom";

import { CiLocationOn } from "react-icons/ci";
import { AiOutlineDownload } from "react-icons/ai";
import { CiHeart } from "react-icons/ci";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { useNavigate } from "react-router-dom";

import { DataContext } from "../../ContextAPI";
import { useAuth} from '../../AuthContext'

const PropertyDetails = () => {

  const navigate = useNavigate(); 
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);

  const { addLead , fetchData} = useContext(DataContext);

  const location = useLocation();
  const { product } = location.state || {};

  const { userId , accessToken} = useAuth();



  console.log(userId , accessToken , "checj userdata")

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    rating: "",
    review_text: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleWislistSubmit = async (e) => {
    e.preventDefault();

    if (!userId || !accessToken) {
      alert("User is not authenticated. Please log in.");
      return;
    }

    const payload = { user_id: +userId, lead_id: product.id };

    console.log(payload);

    try {
      const response = await fetch(
        `https://buyinteriorapp-ed1e9e8d81f4.herokuapp.com/api/wishlists/?user_id=${userId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify(payload),
        }
      );

      if (response.ok) {
        alert("Lead Liked successfully!");
        // onClose();
        fetchData();
      } else {
        const errorData = await response.json();
        alert(
          `Failed to save address (Error ${response.status}): ${
            errorData.message || "Unknown error"
          }`
        );
      }
    } catch (error) {
      alert("Error: " + error.message);
    }
  };

  const handleATCSubmit = async (e) => {
    e.preventDefault();

    if (!userId || !accessToken) {
      alert("User is not authenticated. Please log in.");
      return;
    }

    const payload = { user_id: +userId, lead_id: product.id, quantity: 3 };

    console.log(payload);

    try {
      const response = await fetch(
        `https://buyinteriorapp-ed1e9e8d81f4.herokuapp.com/api/cart/?user_id=${userId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify(payload),
        }
      );

      if (response.ok) {
        alert("Lead Added to Cart successfully!");
        // onClose();
        fetchData();
      } else {
        const errorData = await response.json();
        alert(
          `Failed to save lead (Error ${response.status}): ${
            errorData.message || "Unknown error"
          }`
        );
      }
    } catch (error) {
      alert("Error: " + error.message);
    }
  };


   const validateEmail = (email) => {
     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
     return emailRegex.test(email);
   };


  const validateRating = (rating) => {
    const validChoices = [1, 2, 3, 4, 5]; 
    return validChoices.includes(Number(rating));
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();

    if (!userId || !accessToken) {
      alert("User is not authenticated. Please log in.");
      return;
    }

     let payload = {
       name: formData.name,
       email: formData.email,
       rating: formData.rating,
       review_text: formData.review_text
     };

    console.log(payload);

    try {
      const response = await fetch(
        `https://buyinteriorapp-ed1e9e8d81f4.herokuapp.com/api/leads/${product.id}/reviews/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify(payload),
        }
      );

      if (response.ok) {
        alert("Review posted successfully!");
        setFormData({
          name: "",
          email: "",
          rating: "",
          review_text: "",
        });
        fetchData();
      } else {
        const errorData = await response.json();
        alert(
          `Failed to post Review (Error ${response.status}): ${
            errorData.message || "Unknown error"
          }`
        );
      }
    } catch (error) {
      alert("Error: " + error.message);
    }
  };

  const downloadPDF = () => {
    const pdf = new jsPDF();

    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(18);
    pdf.text("Product Details", 10, 10);

    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(12);

    pdf.text(`Product Name: ${product.name}`, 10, 30);
    pdf.text(`Location: ${product.location}`, 10, 40);
    pdf.text(`Price: ₹${product.price}`, 10, 50);
    pdf.text(`Discount Price: ₹${product.discount_price}`, 10, 60);
    pdf.text(`Budget: ₹${product.budget}`, 10, 70);
    pdf.text(`Property Type: ${product.property_type}`, 10, 80);
    pdf.text(`Property ID: ${product.id}`, 10, 90);
    pdf.text(`Service Required On: ${product.service_required_on}`, 10, 100);

    pdf.setFont("helvetica", "bold");
    pdf.text("Requirements:", 10, 110);

    pdf.setFont("helvetica", "normal");
    pdf.text(product.requirement, 10, 120, { maxWidth: 180 });

    pdf.save("product-details.pdf");
  };


  const handleBuyNow = () => {
    addLead([product]);
    if (userId) {
      navigate("/CheckOut");
    } else {
      navigate("/SignIn", { state: { from: "/CheckOut" } });
    }
  };

  return (
    <div className="property-details-container">
      <nav className="navbar-PDP">
        <div className="navbar-container">
          <div className="navbar-left">
            <button
              onClick={() => window.history.back()}
              className="navbar-button"
            >
              <i className="ri-arrow-left-line text-xl"></i>
            </button>
            <h1 className="navbar-title">Property Details</h1>
          </div>
          <div className="navbar-right">
            <button className="navbar-button">
              <i className="ri-share-line text-xl"></i>
            </button>
            <button className="navbar-button">
              <i className="ri-bookmark-line text-xl"></i>
            </button>
          </div>
        </div>
      </nav>

      <main className="main-content-PDP">
        <div className="property-card">
          <img
            src={product.image_url}
            alt="Property Image"
            className="property-image"
          />
          <div className="property-content">
            <div className="property-header">
              <div>
                <h2 className="property-title">{product.name}</h2>
                <div className="property-location">
                  <CiLocationOn size={20} />
                  <span className="property-location-text">
                    {product.location}
                  </span>
                </div>
              </div>
              <span className="property-status">For Sale</span>
            </div>
            <div className="price-Details">
              <div className="price-PDP">
                <h2> ₹{product.discount_price}</h2>
                <h3> ₹{product.price}</h3>
              </div>
              <h1>Budget {product.budget}</h1>
            </div>
            <div className="property-details">
              <h3 className="requirements-title">Property-Details</h3>
              <div className="property-details-sub">
                <div className="property-details-sub-1">
                  <div className="property-details-left">
                    <h2>Property Type</h2>
                    <h2>{product.property_type}</h2>
                  </div>
                  <div className="property-details-left">
                    <h2>Property ID</h2>
                    <h2>{product.id}</h2>
                  </div>
                </div>
                <div className="property-details-sub-2">
                  <div className="property-details-right">
                    <h2>service required on</h2>
                    <h2>{product.service_required_on}</h2>
                  </div>
                </div>
              </div>
            </div>
            <div className="property-buttons">
              <div className="property-requirements">
                <h3 className="requirements-title">Requirements</h3>
                <p className="requirements-text">{product.requirement}</p>
              </div>
              <div>
                <button onClick={handleWislistSubmit}>
                  <CiHeart size={22} />
                </button>
              </div>
            </div>
            <div style={{ paddingTop: 30 }}>
              <h3 className="requirements-title">Submit Your Review</h3>
              <div>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter your Name"
                  value={formData.name}
                  onChange={handleChange}
                  style={{
                    width: "100%",
                    padding: "8px",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                    marginBottom: "8px",
                  }}
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your Email"
                  value={formData.email}
                  onChange={handleChange}
                  style={{
                    width: "100%",
                    padding: "8px",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                    marginBottom: "8px",
                  }}
                />
                <input
                  type="text"
                  name="rating"
                  placeholder="Rating (1-5)"
                  value={formData.rating}
                  onChange={handleChange}
                  min="1"
                  max="5"
                  style={{
                    width: "100%",
                    padding: "8px",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                    marginBottom: "8px",
                  }}
                />
                <textarea
                  name="review_text"
                  placeholder="Your review"
                  value={formData.review_text}
                  onChange={handleChange}
                  style={{
                    width: "100%",
                    padding: "8px",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                    marginBottom: "8px",
                    height: "80px",
                  }}
                ></textarea>
                <button onClick={handleReviewSubmit} className="btn-PDP">
                  submit Review
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <div className="buttons-PDP">
        <div style={{ gap: 10, display: "flex" }}>
          <button onClick={handleATCSubmit} className="btn-PDP">
            Add to cart
          </button>
        </div>
        <button onClick={handleBuyNow} className="btn-PDP">
          Buy Now
        </button>
      </div>
    </div>
  );
};

export default PropertyDetails;
