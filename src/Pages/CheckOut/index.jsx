import React, { useContext, useState , useEffect } from "react";
import "./Styles.css";

import { IoIosAdd } from "react-icons/io";
import { MdDeleteOutline } from "react-icons/md";
import { MdModeEdit } from "react-icons/md";
import { LuPhone } from "react-icons/lu";
import { CiMail } from "react-icons/ci";
import { IoCheckmark } from "react-icons/io5";
import { DataContext } from "../../ContextAPI";
import { CiLocationOn } from "react-icons/ci";


import axios from 'axios'

const Index = () => {
  const { Address, loading, error, fetchAddresses, AllLeads, Profile , setLeads } =
    useContext(DataContext);


    console.log(AllLeads , 'allleads')

   const [addresses, setAddresses] = useState(Address || []);
   const [paymentSuccess, setPaymentSuccess] = useState(null);
  
    useEffect(() => {
      if (Address) {
        setAddresses(Address);
      }
    }, [Address]);


    console.log(AllLeads , 'allleads');

  const [editingAddressId, setEditingAddressId] = useState(null);
  const [editedAddress, setEditedAddress] = useState(null);
  const [selectedAddress, setSelectedAddress] = useState(null);

  const handleSelectAddress = (address) => {
    setSelectedAddress(address);
  };

  // Handle Input Change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedAddress((prev) => ({ ...prev, [name]: value }));
  };

  // Handle Save Click
  const handleSaveClick = () => {
    // updateAddress(editedAddress); 
    setEditingAddressId(null); 
  };

  // Open Address Form for Editing
  const openAddressForm = (address) => {
    setEditingAddressId(address.id);
    setEditedAddress(address);
  };


  // form data code from here

  const { fetchData } = useContext(DataContext);
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
    const [createOrder , setOrder] = useState(null)
  
    const userId = localStorage.getItem("userId");
    const accessToken = localStorage.getItem("accessToken");
  
    console.log("check data", userId, accessToken);
  
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
  
      console.log(addressData);
  
      try {
        const response = await fetch(
          "https://buyinteriorapp-ed1e9e8d81f4.herokuapp.com/api/addresses/",
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
          fetchData();
          alert("Address created successfully!");
          setFormData(null)
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


    // quantity code here
    const [quantities, setQuantities] = useState(
      AllLeads.reduce((acc, item) => {
        acc[item.id] = 1; 
        return acc;
      }, {})
    );

    const handleQuantityChange = (id, newQuantity) => {
      setQuantities((prevQuantities) => ({
        ...prevQuantities,
        [id]: newQuantity,
      }));
    };

    const subtotal = AllLeads.reduce(
      (sum, item) => sum + item.price * quantities[item.id],
      0
    );

    const gstAmount = subtotal * 0.18;

    // Calculate total price including GST
    const totalPrice = subtotal + gstAmount;


    const items = AllLeads.map((lead) => ({
      lead_id: lead.id,
      quantity: quantities[lead.id] || 1,
      price: lead.price, 
    }));




    const handleOrder = async () => {
      const payload = {
        user: userId,
        address: {
          street: selectedAddress.street_address,
          city: selectedAddress.city,
          zip: selectedAddress.postcode,
        },
        items,
        subtotal: subtotal,
        gst: gstAmount,
        total: totalPrice,
      };

      console.log(payload, "payload");

      try {
        const response = await axios.post(
          "https://buyinteriorapp-ed1e9e8d81f4.herokuapp.com/api/orders/create/",
          payload,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

         if (response.status === 201 || response.status === 200) {
           setLeads([]);
           const orderId = response.data.order_id; 
           console.log(orderId, "Order ID received from API");

           if (response.data.razorpay_order_id) {
             handlePayment(
               response.data.razorpay_order_id,
               totalPrice,
               orderId
             );
           } else {
             alert("Failed to generate Razorpay order ID.");
           }

           alert("Order placed successfully!");
           console.log("Response:", response.data);
         } else {
           alert("Something went wrong, please try again.");
         }
      } catch (error) {
        console.error("Error:", error.response?.data || error.message);
        alert("Failed to place the order.");
      }
    };

    const handlePayment = (razorpayOrderId, total, orderId) => {
      const options = {
        key: "rzp_live_pNFMWMwV8P1U4s",
        amount: total * 100,
        currency: "INR",
        name: "A SPACE INTERIORS AND CONSTRUCTION",
        description: "Order Payment",
        order_id: razorpayOrderId,
        handler: (response) => handlePaymentSuccess(response, orderId),
        prefill: {
          name: Profile.username,
          email: Profile.email,
        },
        theme: {
          color: "#3399cc",
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.on("payment.failed", function (response) {
        alert("❌ Payment Failed: " + response.error.description);
        console.log("Failed Response:", response.error);
      });
      razorpay.open();
    };

    const handlePaymentSuccess = async (response ,  orderId) => {
      console.log(createOrder, "order id inside function"); 



      setPaymentSuccess(response);

      alert(
        "✅ Payment Successful! Payment ID: " + response.razorpay_payment_id
      );
      console.log("Success Response:", response);

      const paymentData = {
        razorpay_payment_id: response.razorpay_payment_id,
        razorpay_order_id: response.razorpay_order_id,
        razorpay_signature: response.razorpay_signature,
      };

      try {
        const apiResponse = await axios.post(
          `https://buyinteriorapp-ed1e9e8d81f4.herokuapp.com/api/orders/process_payment/${orderId}/`,
          paymentData,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        console.log("API Response:", apiResponse.data);
        alert("✅ Payment recorded successfully!");
      } catch (error) {
        console.error("❌ Error sending payment success data:", error);
        alert("⚠️ Error recording payment. Please contact support.");
      }
    };

  return (
    <div className="checkout-container">
      <div className="left-checkout">
        <h1 className="checkout-heading">Saved Address</h1>
        <div className="checkout-address-grid">
          {addresses.map((address) => (
            <div
              key={address.id}
              className={`address-card ${
                selectedAddress?.id === address.id ? "checkout-selected" : ""
              }`}
              onClick={() => handleSelectAddress(address)}
            >
              <div className="address-header">
                <div>
                  <h3 className="address-name">
                    {address.first_name} {address.last_name}
                  </h3>
                  {address.company_name && (
                    <p className="company-name">{address.company_name}</p>
                  )}
                </div>
                <span className="address-type">{address.address_type}</span>
              </div>

              <div className="address-details">
                <p className="address-street">
                  {editingAddressId === address.id ? (
                    <input
                      type="text"
                      name="street_address"
                      value={editedAddress.street_address}
                      onChange={handleInputChange}
                      className="input-address"
                    />
                  ) : (
                    address.street_address
                  )}
                </p>
                <p className="address-city-state">
                  {editingAddressId === address.id ? (
                    <>
                      <input
                        type="text"
                        name="city"
                        value={editedAddress.city}
                        onChange={handleInputChange}
                        className="input-address"
                      />
                      <input
                        type="text"
                        name="state"
                        value={editedAddress.state}
                        onChange={handleInputChange}
                        className="input-address"
                      />
                      <input
                        type="text"
                        name="postcode"
                        value={editedAddress.postcode}
                        onChange={handleInputChange}
                        className="input-address"
                      />
                    </>
                  ) : (
                    `${address.city}, ${address.state} ${address.postcode}`
                  )}
                </p>
                <p className="address-country">
                  {editingAddressId === address.id ? (
                    <input
                      type="text"
                      name="country"
                      value={editedAddress.country}
                      onChange={handleInputChange}
                      className="input-address"
                    />
                  ) : (
                    address.country
                  )}
                </p>
              </div>

              <div className="contact-details">
                <div className="contact-item">
                  <LuPhone />
                  <span>
                    {editingAddressId === address.id ? (
                      <input
                        type="text"
                        name="phone"
                        value={editedAddress.phone}
                        onChange={handleInputChange}
                        className="input-address"
                      />
                    ) : (
                      address.phone
                    )}
                  </span>
                </div>
                <div className="contact-item">
                  <CiMail />
                  <span>
                    {editingAddressId === address.id ? (
                      <input
                        type="text"
                        name="email"
                        value={editedAddress.email}
                        onChange={handleInputChange}
                        className="input-address"
                      />
                    ) : (
                      address.email
                    )}
                  </span>
                </div>
              </div>

              <div className="action-buttons">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    openAddressForm(address);
                  }}
                  className="edit-button"
                >
                  <MdModeEdit />
                </button>
                {editingAddressId === address.id && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSaveClick();
                    }}
                    // onClick={handleSaveClick}
                    className="edit-check"
                  >
                    <IoCheckmark />
                  </button>
                )}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    // Handle delete logic here
                  }}
                  className="delete-button"
                >
                  <MdDeleteOutline />
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="add-address">
          <h1 className="checkout-heading">Add New Address</h1>
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
              <button
                type="button"
                // onClick={onClose}
                className="button button-cancel"
              >
                Cancel
              </button>
              <button type="submit" className="button button-primary">
                Save Address
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="right-checkout">
        <h1 className="checkout-heading">Order Summery</h1>
        <div>
          {AllLeads.map((item, index) => (
            <div key={index} className="Checkout-Lead-item">
              <div className="Checkout-Lead-image">
                <img
                  src="https://bookmyinteriorlead.com/wp-content/uploads/2020/11/NEW-WEBSITE-THEME-LEAD-IMAGE.jpg"
                  alt="Lead"
                  style={{ width: "100%", height: "100%" }}
                />
              </div>
              <div className="checkout-lead-details">
                <div style={{ width: "100%" }}>
                  <h2 style={{ fontSize: "1.2rem", fontWeight: 500 }}>
                    {item.name} / {item.property_type} /{" "}
                    {item.service_required_on}
                  </h2>
                  <div className="Quantity-price">
                    <div>
                      <div className="property-location">
                        <CiLocationOn size={20} />
                        <span className="property-location-text">
                          {item.location}
                        </span>
                      </div>
                      <h2 style={{ padding: 5 }}>₹{item.price}</h2>
                    </div>
                    <div className="quantity-selector">
                      <button
                        className="quantity-btn"
                        onClick={() =>
                          handleQuantityChange(item.id, quantities[item.id] - 1)
                        }
                      >
                        -
                      </button>
                      <input
                        type="number"
                        className="quantity-input"
                        value={quantities[item.id]}
                        min="1"
                        max="3"
                        onChange={(e) => {
                          const value = Number(e.target.value);
                          handleQuantityChange(item.id, value);
                        }}
                      />
                      <button
                        className="quantity-btn"
                        onClick={() =>
                          handleQuantityChange(item.id, quantities[item.id] + 1)
                        }
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ padding: "10px 10px" }}>
          <h2
            style={{ padding: 0, marginBottom: 10 }}
            className="checkout-heading"
          >
            Price Details
          </h2>
          <div>
            <div className="checkout-price">
              <h2>All Lead(s) Price:</h2>
              <h2>₹{subtotal.toFixed(2)}</h2>
            </div>
            <div className="checkout-price">
              <h2>Gst (18%):</h2>
              <h2>₹{gstAmount.toFixed(2)}</h2>
            </div>
            <div
              style={{
                borderTopWidth: 0.5,
                borderTopStyle: "solid",
                paddingTop: 10,
              }}
              className="checkout-price"
            >
              <h2>Total</h2>
              <h2>₹{totalPrice.toFixed(2)}</h2>
            </div>
          </div>
          <div>
            <button
              type="button"
              style={{
                color: "white",
                padding: "10px 15px",
                backgroundColor: "#1E485B",
                borderRadius:5
              }}
              onClick={handleOrder}
            >
              Continue Payment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
