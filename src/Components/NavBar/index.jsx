import React from 'react';
import './NavBar.css'

import { Link } from "react-router-dom";
const Index = () => {
    // const styles = {
    //     ul: {
    //         fle
    //     }
    //   };

    return (
        <div style={{}}>
            <ul style={{flexDirection:'row',display:'flex',textDecoration:'none',listStyle: 'none', padding: 0, margin: 0 }}>
            <li style={{ marginRight: '20px' }}>
                <Link className="name" to="/" style={{
                    textDecoration: 'none',
                    color: 'inherit',
                }}>
                    Home
                </Link>
            </li>
            <li style={{ marginRight: '20px' }}>
                <Link className='name' to="/about" style={{
                    textDecoration: 'none',
                    color: 'inherit'
                }}>About</Link>
            </li>
            <li style={{ marginRight: '20px' }}>
                <Link className='name' to="/location" style={{
                    textDecoration: 'none',
                    color: 'inherit'
                }}>Locations</Link>
            </li>
            <li style={{ marginRight: '20px' }}>
                <Link className='name' to='RefundPolicy' style={{
                    textDecoration: 'none',
                    color: 'inherit'
                }}>Refund Policy</Link>
            </li>
            {/* <li style={{ marginRight: '20px' }}>
                <a href="#contact" style={{
                    textDecoration: 'none',
                    color: 'inherit'
                }}>My Account</a>
            </li> */}
            <li style={{ marginRight: '20px' }}>
                <Link className='name' to='/Privacypolicy' style={{
                    textDecoration: 'none',
                    color: 'inherit'
                }}>Privacy Policy</Link>
            </li>
            <li style={{ marginRight: '20px' }}>
                <Link className='name' to='/SignIn'style={{
                    textDecoration: 'none',
                    color: 'inherit'
                }}>Sighin</Link>
            </li>
            {/* <li style={{ marginRight: '20px' }}>
                <a href="#contact" style={{
                    textDecoration: 'none',
                    color: 'inherit'
                }}>Contact Us</a>
            </li> */}
            {/* <li>
                <a href="#contact" style={{
                    textDecoration: 'none',
                    color: 'inherit'
                }}>Refund Policy</a>
            </li> */}
            </ul>
            
        </div>
    );
}

export default Index;
