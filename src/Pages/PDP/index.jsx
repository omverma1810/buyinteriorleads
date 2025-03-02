import React, { useState } from "react";
import "./index.css";

import { useLocation } from 'react-router-dom';

import { CiLocationOn } from "react-icons/ci";
import { AiOutlineDownload } from "react-icons/ai";
import { CiHeart } from "react-icons/ci";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

const PropertyDetails = () => {
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);


  const location = useLocation();
  const { product } = location.state || {};

  const userId = localStorage.getItem("userId");
  const accessToken = localStorage.getItem("accessToken");


  const handleWislistSubmit = async (e) => {
    e.preventDefault();

    if (!userId || !accessToken) {
      alert("User is not authenticated. Please log in.");
      return;
    }

    const payload = {user: userId , id: product.id}

    console.log(payload)

    try {
      const response = await fetch(
        "https://buyinteriorapp-d0adf77e7c33.herokuapp.com/api/wishlists/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify('payload'),
        }
      );

      if (response.ok) {
        alert("Lead Liked successfully!");
        // onClose(); 
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


  

  const handleATCSubmit = async (e) => {
    e.preventDefault();

    if (!userId || !accessToken) {
      alert("User is not authenticated. Please log in.");
      return;
    }

    const payload = {user: userId , id: product.id}

    console.log(payload)

    try {
      const response = await fetch(
        "https://buyinteriorapp-d0adf77e7c33.herokuapp.com/api/wishlists/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify('payload'),
        }
      );

      if (response.ok) {
        alert("Lead Liked successfully!");
        // onClose(); 
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
            src="https://bookmyinteriorlead.com/wp-content/uploads/2020/11/NEW-WEBSITE-THEME-LEAD-IMAGE.jpg"
            alt="Property Image"
            className="property-image"
          />
          <div className="property-content">
            <div className="property-header">
              <div>
                <h2 className="property-title">{product.name}</h2>
                <div className="property-location">
                  <CiLocationOn size={20}/>
                  <span className="property-location-text">{product.location}</span>
                </div>
              </div>
              <span className="property-status">For Sale</span>
            </div>
            <div className='price-Details'>
              <div className='price-PDP'>
                  <h2> ₹{product.discount_price}</h2>
                  <h3> ₹{product.price}</h3>
              </div>
              <h1>Budget {product.budget}</h1>
            </div>
            <div className='property-details'>
              <h3 className="requirements-title">Property-Details</h3>
              <div className='property-details-sub'>
                <div className='property-details-sub-1'>
                  <div className='property-details-left'>
                    <h2>Property Type</h2>
                    <h2>{product.property_type}</h2>
                  </div>
                  <div className='property-details-left'>
                    <h2>Property ID</h2>
                    <h2>{product.id}</h2>
                  </div>
                </div>
                <div className='property-details-sub-2'>
                  <div className='property-details-right'>
                    <h2>service required on</h2>
                    <h2>{product.service_required_on}</h2>
                  </div>
                </div>
              </div>


            </div>
            <div className='property-buttons'>
              <div className="property-requirements">
                <h3 className="requirements-title">Requirements</h3>
                <p className="requirements-text">{product.requirement}</p>
              </div>
              <div>
                <button onClick={downloadPDF}  style={{paddingRight:10}}><AiOutlineDownload size={22}/></button>
                <button onClick={handleWislistSubmit}><CiHeart size={22}/></button>
              </div>

            </div>
          </div>
        </div>
      </main>
      <div className='buttons-PDP'>
        <button onClick={handleATCSubmit} className='btn-PDP'>Add to cart</button>
        <button className='btn-PDP'>Buy Now</button>
      </div>
    </div>
  );
};

export default PropertyDetails;