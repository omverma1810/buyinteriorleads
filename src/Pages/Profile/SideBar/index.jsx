import React from 'react';
import './index.css';

const Sidebar = ({ setActivePage, activePage }) => (
  <aside className="sidebar">
    <img src="/Bil.svg" alt="logo" className="logo" />
    <nav className="nav-links-Profile">
      <a
        href="#"
        className={`nav-link-Profile ${
          activePage === "dashboard" ? "activeProfile" : ""
        }`}
        onClick={() => setActivePage("dashboard")}
      >
        <i className="ri-dashboard-line"></i>
        <span>Dashboard</span>
      </a>
      <a
        href="#"
        className={`nav-link-Profile ${
          activePage === "orders" ? "activeProfile" : ""
        }`}
        onClick={() => setActivePage("orders")}
      >
        <i className="ri-shopping-bag-line"></i>
        <span>Orders</span>
      </a>
      <a
        href="#"
        className={`nav-link-Profile ${
          activePage === "Downloads" ? "activeProfile" : ""
        }`}
        onClick={() => setActivePage("Downloads")}
      >
        <i className="ri-shopping-bag-line"></i>
        <span>Downloads</span>
      </a>
      <a
        href="#"
        className={`nav-link-Profile ${
          activePage === "Addresses" ? "activeProfile" : ""
        }`}
        onClick={() => setActivePage("Addresses")}
      >
        <i className="ri-shopping-bag-line"></i>
        <span>Addresses</span>
      </a>
      <a
        href="#"
        className={`nav-link-Profile ${
          activePage === "ATC" ? "activeProfile" : ""
        }`}
        onClick={() => setActivePage("ATC")}
      >
        <i className="ri-shopping-bag-line"></i>
        <span>Add to Cart</span>
      </a>
      <a
        href="#"
        className={`nav-link-Profile ${
          activePage === "Wishlist" ? "activeProfile" : ""
        }`}
        onClick={() => setActivePage("Wishlist")}
      >
        <i className="ri-shopping-bag-line"></i>
        <span>Wishlist</span>
      </a>
    </nav>
  </aside>
);

export default Sidebar;