import React, { useContext } from 'react';
import './index.css';

import { DataContext } from "../ContextAPI";

const AccountDetails = () => {
  // Destructure the values from the context
  const { wishlist, loading, error, orders, cart, Profile } = useContext(DataContext);

  return (
    <div className="account-details">
      <div className="account-header">
        <h2>Account Details</h2>
      </div>

      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="account-info">
          <div>
            <label>User Name</label>
            <p>{Profile?.username}</p>
          </div>
          <div>
            <label>Email Address</label>
            <p>{Profile?.email}</p>{" "}
          </div>
        </div>
      )}
      <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
        <button
        onClick={() => {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("userId");
          alert("Logged out successfully!");
          window.location.reload();
        }} className="change-password-button">Logout</button>
      </div>
    </div>
  );
};

export default AccountDetails;
