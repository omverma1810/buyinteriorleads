import React from 'react';
import './index.css'

import { PiPlugsConnectedLight } from "react-icons/pi";
import { VscVerified } from "react-icons/vsc";
import { FaHandsHelping } from "react-icons/fa";
import { IoPersonOutline } from "react-icons/io5";
import { RiTaskLine } from "react-icons/ri";
import { MdOutlineDesignServices } from "react-icons/md";
import { GrStatusGood } from "react-icons/gr";
import { FiTarget } from "react-icons/fi";


const Index = () => {
    return (
      <div className="main">
        <div>
          <div className="Header-w">
            <h1 className="header-main">
              Streamlined Lead Management for Interior Designers
            </h1>
            <p className="header-p">
              Effortlessly connect, access quality clients, and secure top
              projects.
            </p>
          </div>
          <div className="Container">
            <div className="container-item-w">
              <h3 className="container-item-m">Lead Generation</h3>
              <div style={{ paddingTop: 20 }}>
                <div className="container-item-point">
                  <div className="icon">
                    <PiPlugsConnectedLight color="white" />
                  </div>
                  <p>Connects interior professionals.</p>
                </div>
                <div className="container-item-point">
                  <div className="icon">
                    <VscVerified color="white" />
                  </div>
                  <p>Verifies leads</p>
                </div>
                <div className="container-item-point">
                  <div className="icon">
                    <FaHandsHelping color="white" />
                  </div>
                  <p>Supports business growth.</p>
                </div>
              </div>
            </div>
            <div className="container-item-w">
              <h3 className="container-item-m">Lead Publishing</h3>
              <div style={{ paddingTop: 20 }}>
                <div className="container-item-point">
                  <div className="icon">
                    <PiPlugsConnectedLight color="white" />
                  </div>
                  <p>Exclusive verified leads.</p>
                </div>
                <div className="container-item-point">
                  <div className="icon">
                    <IoPersonOutline color="white" />
                  </div>
                  <p>Exclusive client access.</p>
                </div>
                <div className="container-item-point">
                  <div className="icon">
                    <RiTaskLine color="white" />
                  </div>
                  <p>Boosted sales opportunities.</p>
                </div>
              </div>
            </div>
            <div className="container-item-w">
              <h3 className="container-item-m">Order Confirmation</h3>
              <div style={{ paddingTop: 20 }}>
                <div className="container-item-point">
                  <div className="icon">
                    <MdOutlineDesignServices color="white" />
                  </div>
                  <p>Select best design.</p>
                </div>
                <div className="container-item-point">
                  <div className="icon">
                    <FiTarget color="white" />
                  </div>
                  <p>Choose accurate estimate.</p>
                </div>
                <div className="container-item-point">
                  <div className="icon">
                    <GrStatusGood color="white" />
                  </div>
                  <p>Receive quality leads.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <h1 className='Header'>HOW IT WORKS</h1> */}
        {/* <div className='Container'>
                <div className='paragraph'>
                    <p className='Ptext'>The brightest consultants were once exclusive to a few major firms, making their expertise hard to access. Now, their community is open to you, providing direct access to top-tier talent and insights.</p>
                    <button className='button'>Buy Leads</button>
                </div>
                <div className='container-item'>
                    <div className='item'>
                        <h2 className='item-number'>1</h2>
                        <div>
                            <h2 className='item-h2'>Lead Generation & Verification</h2>
                            <div className='item-para'>
                                <p className='item-p-text'>We connect interior professionals with verified leads, helping designers grow their business.</p>
                            </div>
                        </div>
                    </div>
                    <div style={{paddingTop:30}} className='item'>
                        <h2 className='item-number'>2</h2>
                        <div>
                            <h2 className='item-h2'>Lead Publishing For Sales </h2>
                            <div className='item-para'>
                                <p className='item-p-text'>Verified leads are limited to three interior designers, ensuring exclusive access to quality clients.</p>
                            </div>
                        </div>
                    </div>
                    <div style={{paddingTop:30}} className='item'>
                        <h2 className='item-number'>3</h2>
                        <div>
                            <h2 className='item-h2'>Order Confirmation</h2>
                            <div className='item-para'>
                                <p className='item-p-text'>
                                Customers select the best design and estimate, while we provide top-quality interior leads.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}
      </div>
    );
}

export default Index;
