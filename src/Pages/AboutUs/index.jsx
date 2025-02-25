import React from 'react';
import './index.css'

import Marque from '../../Components/Marque'

import { GoVerified } from "react-icons/go";
import { CiLocationArrow1 } from "react-icons/ci";
import { VscWorkspaceTrusted } from "react-icons/vsc";
import { IoPricetagsOutline } from "react-icons/io5";

const Index = () => {
    return (
        <div className='container-about'>
            <div className='space'>
                <div className='sub-conatiner-abt'>
                    <div className='heading-container'>
                        <h1 className='abt-heading'>Find Exclusive Interior Design Leads & Grow Your Business!</h1>
                    </div>
                   
                </div>
                <div className='video-conatiner'>
                    <video 
                        loop
                        autoPlay
                        muted
                        style={{ width: '100%', height: '100%', objectFit: 'cover',borderRadius:14 }}
                    >
                        <source src={`${process.env.PUBLIC_URL}/Images/video.mp4`} type="video/mp4" />
                    </video>
                </div>
            </div>
            <div className='container-featured'>
                <div className='features-heading'>
                    <h1 className='featured-heading-text'> Why Buy Interior Lead? Transform Your Business with Precision </h1>
                </div>
                <div className='featured-items'>
                    <div className='item-item'>
                        <div className='sub-item-header'>
                            <GoVerified size={55} color='white'/>
                            <h2 className='item-text'>Verified Interior Design Leads</h2>
                        </div>
                        <p className='item-p'>No more wasted time! We provide exclusive, high-conversion leads that are verified to ensure you’re only connecting with potential clients who are ready to act.</p>
                    </div>
                    <div className='item-item'>
                        <div className='sub-item-header'>
                            <CiLocationArrow1 size={55} color='white'/>
                            <h2 className='item-text'>Location-Specific Leads</h2>
                        </div>
                        <p className='item-p'>We match you with leads based on your preferred location. Connect with clients in your city, region, or state. Grow your business with nearby clients seeking interior design services.</p>
                    </div>
                    <div className='item-item'>
                        <div className='sub-item-header'>
                            <VscWorkspaceTrusted size={55} color='white'/>
                            <h2 className='item-text'>Trusted by Thousands of Designers</h2>
                        </div>
                        <p className='item-p'>Thousands of designers and architects trust Book My Interior Lead for verified leads. Our community spans India and beyond. We're a top platform for interior design lead generation.</p>
                    </div>
                    <div className='item-item'>
                        <div className='sub-item-header'>
                            <IoPricetagsOutline size={55} color='white'/>
                            <h2 className='item-text'>Affordable & Effective</h2>
                        </div>
                        <p className='item-p'>We offer high-quality leads at competitive prices for the best ROI. With flexible pricing and discounts, you can get leads that fit your budget..</p>
                    </div>
                    

                </div>
            </div>
            <div className='CTA'>
                <h1 className='CTA-Text'>Start Expanding Your Interior Design Network Today!</h1>
            </div>

            <Marque/>

            
        </div>
    );
}

export default Index;
