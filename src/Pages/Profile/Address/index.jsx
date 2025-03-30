import React, { useState, useContext, useEffect } from "react";
import "./index.css";

import { IoIosAdd } from "react-icons/io";
import { MdDeleteOutline } from "react-icons/md";
import { MdModeEdit } from "react-icons/md";
import { LuPhone } from "react-icons/lu";
import { CiMail } from "react-icons/ci";
import { IoCheckmark } from "react-icons/io5";

import { DataContext } from "../../../ContextAPI";
import AddressForm from "./AddressForm";

import { useAuth } from '../../../AuthContext'

const App = () => {
  const { Address, loading, error, fetchAddresses, fetchData } =
    useContext(DataContext);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const {userId , accessToken} = useAuth();

  const [addresses, setAddresses] = useState(Address || []);

  useEffect(() => {
    if (Address) {
      setAddresses(Address);
    }
  }, [Address]);

  const [modalOpen, setModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [formData, setFormData] = useState({
    id: "",
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

  // const [editedAddress, setEditedAddress] = useState(
  //   Address[0] || {
  //     id: "",
  //     first_name: "",
  //     last_name: "",
  //     company_name: "",
  //     street_address: "",
  //     city: "",
  //     state: "",
  //     country: "India",
  //     postcode: "",
  //     phone: "",
  //     email: "",
  //     address_type: "Home",
  //   }
  // );

  // const openAddressForm = (isEdit = false, address = null) => {
  //   setIsEditMode(isEdit);
  //   if (isEdit && address) {
  //     setFormData({ ...address });
  //   }
  //   setModalOpen(true);
  // };

  const closeAddressForm = () => {
    setModalOpen(false);
    setFormData({
      id: "",
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
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedAddresses = isEditMode
      ? addresses.map((address) =>
          address.id === formData.id ? formData : address
        )
      : [...addresses, { ...formData, id: Date.now() }];
    setAddresses(updatedAddresses);
    closeAddressForm();
  };

  const deleteAddress = (id) => {
    setAddresses(addresses.filter((address) => address.id !== id));
  };

  const handleEditClick = (address) => {
    setIsEditMode(true);
    setEditedAddress(address);
  };

  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;
  //   setEditedAddress((prev) => ({
  //     ...prev,
  //     [name]: value,
  //   }));
  // };

  // const handleSaveClick = () => {
  //   // Assuming onUpdateAddress is a function that will update the address data
  //   // onUpdateAddress(editedAddress);
  //   setIsEditMode(false);
  // };

  const handleClose = () => {
    setIsFormOpen(false);
  };

  console.log(addresses.length);

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
   const handleSaveClick = async (addressId) => {
     if (!editedAddress) return;

     try {
       const response = await fetch(
         `https://buyinteriorapp-ed1e9e8d81f4.herokuapp.com/api/addresses/${addressId}/?user_id=${userId}`,
         {
           method: "PUT",
           headers: {
             "Content-Type": "application/json",
             Authorization: `Bearer ${accessToken}`,
           },
           body: JSON.stringify(editedAddress),
         }
       );

       if (!response.ok) {
         throw new Error("Failed to update address");
       }

       await response.json();

       fetchData();
       setEditingAddressId(null);
     } catch (error) {
       console.error("Error updating address:", error);
     }
   }


  
    // Open Address Form for Editing
    const openAddressForm = (address) => {
      setEditingAddressId(address.id);
      setEditedAddress(address);
    };




  return (
    <div className="page-container">
      <div className="content-container">
        <div className="header-Address">
          <h1 className="title">My Addresses</h1>
          <button onClick={() => setIsFormOpen(true)} className="add-button">
            <IoIosAdd size={27} />
            <span className="button-text">New Address</span>
          </button>
        </div>
        <div style={{ width: "100%", justifyContent: "center" }}>
          {addresses.length === 0 ? (
            <div
              style={{
                justifyContent: "center",
                display: "flex",
                alignItems: "center",
              }}
              className="empty-state-wishlist"
            >
              <h3 className="empty-title-wishlist">No address found</h3>
              <p className="empty-description-wishlist">
                Add your Address to get started
              </p>
              <button
                // onClick={() => setIsFormOpen(true)}
                className="add-button"
              >
                Add New Address
              </button>
            </div>
          ) : (
            <div className="address-grid">
              {addresses.map((address) => (
                <div
                  key={address.id}
                  className={`address-card ${
                    selectedAddress?.id === address.id
                      ? "checkout-selected"
                      : ""
                  }`}
                  // onClick={() => handleSelectAddress(address)}
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
                          handleSaveClick(editedAddress.id);
                        }}
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
          )}
        </div>
        {isFormOpen && (
          <AddressForm onClose={handleClose} onSubmit={handleSubmit} />
        )}
      </div>
    </div>
  );
};

export default App;
