import React, { useState, useEffect , useContext } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './header.css';
import { CiUser } from "react-icons/ci";
import { CiHeart } from "react-icons/ci";

import { DataContext } from '../../ContextAPI';
import { useAuth } from '../../AuthContext';


const Index = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 456);

    const  { wishlist } = useContext(DataContext);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 456);
            if (window.innerWidth >= 456) {
                setMenuOpen(false); // Close menu when resizing to larger screens
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <nav className="navbar">
            <div className="container-H">

                <img className='logo-m' src='/logoIM.jpeg' alt='logo'/>

                {isMobile ? (
                    <button className="burger-menu" onClick={() => setMenuOpen(!menuOpen)}>
                        {menuOpen ? <FaTimes /> : <FaBars />}
                    </button>
                ) : (
                    <div className="nav-links">
                        <NavLinks />
                    </div>
                )}

                {!isMobile && (
                    <div className="nav-actions">
                        <CartAndButton />
                    </div>
                )}
            </div>

            {isMobile && menuOpen && (
                <div className="mobile-menu">
                    <NavLinks />
                    <CartAndButton />
                </div>
            )}
        </nav>
    );
};

const NavLinks = () => (
    <>
        <Link className="name" to="/">Home</Link>
        <Link className="name" to="/about">About</Link>
        <Link className="name" to="/location">Locations</Link>
        <Link className="name" to="/RefundPolicy">Refund Policy</Link>
        <Link className="name" to="/Privacypolicy">Privacy Policy</Link>
    </>
);

const CartAndButton = () => {

  const { userId } = useAuth();

    const isLoggedIn = userId ? true : false;
     const { wishlist } = useContext(DataContext);

    console.log(isLoggedIn)
    return (
      <div className="cart-btn-container">
        {isLoggedIn ? (
          <div
            style={{
              flexDirection: "row",
              gap: 10,
              display: "flex",
              alignItems: "center",
            }}
          >
            <div className="cart-icon" id="cartIcon">
              <CiHeart size={30} />
              <span className="cart-count">{wishlist.length}</span>
            </div>
            <Link to="/Profile" className="profile-icon">
              <CiUser size={30} />
            </Link>
          </div>
        ) : (
          <Link to="/SignIn">
            <button className="get-started">Get Started</button>
          </Link>
        )}
        {/* <Link to="/SignIn">
            <button className="get-started">Get Started</button>
        </Link> */}
      </div>
    );
};

export default Index;
