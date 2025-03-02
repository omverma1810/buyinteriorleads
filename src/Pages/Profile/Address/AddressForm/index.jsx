import React, { useState } from "react";
import { RiCloseLine } from "react-icons/ri";
import "./index.css";

const AddressForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    company_name: "",
    street_address: "",
    city: "",
    state: "",
    country: "India",
    postcode: "",
    phone: "",
    email: "",
    address_type: "Home",
  });

  const userId = localStorage.getItem("userId");
  const accessToken = localStorage.getItem("accessToken");


  console.log('check data' , userId , accessToken)

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userId || !accessToken) {
      alert("User is not authenticated. Please log in.");
      return;
    }

    const addressData = { ...formData, user_id: userId };

    console.log(addressData)

    try {
      const response = await fetch(
        "https://buyinteriorapp-d0adf77e7c33.herokuapp.com/api/addresses/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify(addressData),
        }
      );

      if (response.ok) {
        alert("Address created successfully!");
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
    <div className="modal">
      <div className="modal-content">
        <div className="modal-header">
          <h2 className="modal-title">Add New Address</h2>
          <button onClick={onClose} className="close-button">
            <RiCloseLine className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="form-group">
              <label className="form-label">First Name</label>
              <input
                type="text"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                required
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label className="form-label">Last Name</label>
              <input
                type="text"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                required
                className="form-input"
              />
            </div>
            <div className="form-group md:col-span-2">
              <label className="form-label">Company Name</label>
              <input
                type="text"
                name="company_name"
                value={formData.company_name}
                onChange={handleChange}
                className="form-input"
              />
            </div>
            <div className="form-group md:col-span-2">
              <label className="form-label">Street Address</label>
              <input
                type="text"
                name="street_address"
                value={formData.street_address}
                onChange={handleChange}
                required
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label className="form-label">City</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label className="form-label">State</label>
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleChange}
                required
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label className="form-label">Country</label>
              <select
                name="country"
                value={formData.country}
                onChange={handleChange}
                required
                className="form-select"
              >
                <option value="India">India</option>
                <option value="USA">USA</option>
                <option value="UK">UK</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Postcode</label>
              <input
                type="text"
                name="postcode"
                value={formData.postcode}
                onChange={handleChange}
                required
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label className="form-label">Phone</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label className="form-label">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label className="form-label">Address Type</label>
              <select
                name="address_type"
                value={formData.address_type}
                onChange={handleChange}
                required
                className="form-select"
              >
                <option value="Home">Home</option>
                <option value="Work">Work</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>
          <div className="btn-container-address">
            <button type="button" onClick={onClose} className="button button-cancel">
              Cancel
            </button>
            <button type="submit" className="button button-primary">
              Save Address
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddressForm;
