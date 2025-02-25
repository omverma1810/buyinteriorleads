import React, {useContext} from 'react';
import './index.css';

import { DataContext } from "../ContextAPI";

const Header = ({ toggleDropdown, showDropdown }) => {

      const { wishlist, loading, error, orders, cart, Profile } = useContext(DataContext);


    return (
      <header className="header">
        {loading ? (
          <div>Loading...</div>
        ) : (
          <div>
            <h1>Welcome back, {Profile?.username}</h1>
            <p>Friday, February 21, 2025</p>
          </div>
        )}
        {/* <div className="header-actions">
            <button className="notification-button">
                <i className="ri-notification-line"></i>
            </button>
        </div> */}
      </header>
    );
};

export default Header;