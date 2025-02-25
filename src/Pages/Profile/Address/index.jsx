import React, { useState, useContext, useEffect } from "react";
import "./index.css";

import { IoIosAdd } from "react-icons/io";
import { MdDeleteOutline } from "react-icons/md";
import { MdModeEdit } from "react-icons/md";
import { LuPhone } from "react-icons/lu";
import { CiMail } from "react-icons/ci";
import { IoCheckmark } from "react-icons/io5";

import { DataContext } from "../ContextAPI";
import AddressForm from "./AddressForm";

const App = () => {
  const { Address, loading, error, fetchAddresses } = useContext(DataContext);
  const [isFormOpen, setIsFormOpen] = useState(false);

  // Use Address from context to initialize the state for addresses
  const [addresses, setAddresses] = useState(Address || []); // Default to an empty array if no addresses

  useEffect(() => {
    if (Address) {
      setAddresses(Address);
    }
  }, [Address]); // Update addresses when Address in context changes

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

  const [editedAddress, setEditedAddress] = useState(
    Address[0] || {
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
    }
  );

  const openAddressForm = (isEdit = false, address = null) => {
    setIsEditMode(isEdit);
    if (isEdit && address) {
      setFormData({ ...address });
    }
    setModalOpen(true);
  };

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
    setEditedAddress(address); // Set the address that the user wants to edit
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedAddress((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveClick = () => {
    // Assuming onUpdateAddress is a function that will update the address data
    // onUpdateAddress(editedAddress);
    setIsEditMode(false);
  };

    const handleClose = () => {
      setIsFormOpen(false);
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
        <div style={{width:'100%',justifyContent:'center'}}>
          {addresses.length === 0 ? (
            <div className="address-grid">
            {addresses.map((address) => (
              <div key={address.id} className="address-card">
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
                    {isEditMode ? (
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
                    {isEditMode ? (
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
                    {isEditMode ? (
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
                      {isEditMode ? (
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
                      {isEditMode ? (
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
                    onClick={() => openAddressForm(true, address)}
                    className="edit-button"
                  >
                    <MdModeEdit />
                  </button>
                  {isEditMode ? (
                    <button onClick={handleSaveClick} className="edit-check">
                      <IoCheckmark />
                    </button>
                  ) : null}
                  <button
                    onClick={() => deleteAddress(address.id)}
                    className="delete-button"
                  >
                    <MdDeleteOutline />
                  </button>
                </div>
              </div>
            ))}
            </div>  
          ) : (
            <div style={{justifyContent:'center',display:'flex', alignItems:"center"}} className="empty-state-wishlist">
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
          )}   
        </div>
        {isFormOpen && (
          <AddressForm
            onClose={handleClose} 
            onSubmit={handleSubmit} 
          />
        )}
      </div>
    </div>
  );
};

export default App;
