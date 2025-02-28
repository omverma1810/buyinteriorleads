import React, { useState } from 'react';
import { 
  Home,
  Info,
  Shield,
  RefreshCw,
  MapPin,
  User,
  Send,
  Mail,
  MessageSquare
} from 'lucide-react';
import { Link } from "react-router-dom";

import './index.css'

const Footer = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  const isLoggedIn = localStorage.getItem("accessToken");

  return (
    <footer className="footer">
        <div className='footer-container'>
            <div className='footer-sub-container'>
                <div className='footer-header'>
                    <h2>Transforming Spaces, Elevating Interiors</h2>
                </div>
            </div>
            <div className="footer-links">
                
                <ul>
                    <li>
                      <Link className="name" to="/" style={{
                        textDecoration: 'none',
                        color: 'inherit',
                      }}>
                        Home
                      </Link>
                    </li>
                    <li>
                      <Link className='name' to="/about" style={{
                            textDecoration: 'none',
                            color: 'inherit'
                        }}>
                          About
                      </Link>
                    </li>
                    <li>
                      <Link className='name' to="/location" style={{
                            textDecoration: 'none',
                            color: 'inherit'
                        }}>
                          Locations
                      </Link>
                    </li>
                    <li>
                      <Link className='name' to='RefundPolicy' style={{
                            textDecoration: 'none',
                            color: 'inherit'
                        }}>
                          Refund Policy
                      </Link>
                    </li>
                    <li>
                      <Link className='name' to='/Privacypolicy' style={{
                            textDecoration: 'none',
                            color: 'inherit'
                        }}>
                          Privacy Policy
                      </Link>
                    </li>
                    {isLoggedIn ? (
                        <Link to="/Profile" className="profile-icon">
                          My Account

                        </Link>
                    ) : (
                        <Link to="/SignIn">
                          My Account
                        </Link>
                    )}                
                </ul>
            </div>
        </div>
    </footer>
  );
};

export default Footer;