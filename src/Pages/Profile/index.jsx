import React, { useState , useContext } from 'react';
import Sidebar from './SideBar';
import Header from './Header';
import Stats from './Stats';
import AccountDetails from './AccountDetails';
import Orders from './Orders';
import Address from './Address';
import WishList from './Wishlist';
import ATC from './ATC'
import './index.css';

import { DataProvider } from './ContextAPI';

const App = () => {
    const [showDropdown, setShowDropdown] = useState(false);
    const [activePage, setActivePage] = useState('dashboard');


    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    const renderContent = () => {
        switch (activePage) {
          case "orders":
            return <Orders />;
          case "Addresses":
            return <Address />;
          case "Wishlist":
            return <WishList />;
          case "ATC":
            return <ATC />;
          case "dashboard":
          default:
            return (
              <>
                <Stats />
                <div className="grid-container">
                  <AccountDetails />
                </div>
              </>
            );
        }
    };

    return (
        <DataProvider>
        <div className="profile-grid">
            <Sidebar setActivePage={setActivePage} activePage={activePage} />
            <main className="main-content-Profile ">
                <Header toggleDropdown={toggleDropdown} showDropdown={showDropdown} />
                {renderContent()}
            </main>
        </div>
        </DataProvider>
    );
};

export default App;