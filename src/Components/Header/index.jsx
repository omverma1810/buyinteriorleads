import React, { useState, useEffect } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './header.css';
import { CiUser } from "react-icons/ci";
import { CiHeart } from "react-icons/ci";

const Index = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 456);

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

    const isLoggedIn = localStorage.getItem("accessToken");

    console.log(isLoggedIn)
    return (

        <div className="cart-btn-container">
            {isLoggedIn ? (
                <div style={{flexDirection:'row', gap:10 , display:'flex' , alignItems:'center'}}>
                    <div className="cart-icon" id="cartIcon">
                        <CiHeart size={30}/>
                        <span className="cart-count">3</span>
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
