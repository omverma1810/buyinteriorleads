import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import './refund.css'

import { MdOutlinePolicy } from "react-icons/md";
import { TbCreditCardRefund } from "react-icons/tb";

const PrivacySection = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="refund-section">
      <div 
        onClick={() => setIsOpen(!isOpen)} 
        className="Refund-section-header"
      >
        <h2>{title}</h2>
        <ChevronDown 
          className={`chevron-icon ${isOpen ? 'rotated' : ''}`} 
        />
      </div>
      <div 
        className={`refund-section-content ${isOpen ? 'open' : ''}`}
      >
        <div className="refund-content-inner">
          {children}
        </div>
      </div>
    </div>
  );
};

const PrivacyPolicy = () => {
  return (
    <div className='RP-conatiner'>
        <div className="RP-left-panel">
            <h1 className='RP-heading'>Refund Policy</h1>
            <p>Your Satisfaction Is Our Priority</p>
        </div> 
        <div className='RP-main-container'>
            <div className='RP-main-item-conatiner'>
                <div className='RP-header-container'>
                    <h1 className='RP-Main-Header'>REPLACEMENT POLICY</h1>
                    <MdOutlinePolicy color='white' size={66}/>
                </div>
                <div className='RP-sub-container'>
                    <PrivacySection title="Eligibility for Replacement:">
                            <p>We offer replacements for leads in the following cases:</p>
                            <ul>
                                <li>The client is unresponsive to calls or messages.</li>
                                <li>The client has already engaged another designer for their project despite our verification.</li>
                                <li>The provided contact details are unreachable within 48 hours of lead purchase.</li>
                            </ul>
                            <p>Replacements will be provided based on the cost of the originally purchased lead, ensuring a transparent and fair process in our interior lead generation service.</p>
                    </PrivacySection>
                    <PrivacySection title="Procedure for Replacement">
                        <p>Replacements will be provided at the cost of the originally purchased lead, ensuring transparency and fairness in our lead generation service.</p>
                    </PrivacySection>
                    <PrivacySection title="Cost Basis">
                            <ul>
                                <li>If a client is unresponsive to calls/messages or the contact details are unreachable, designers must follow up diligently for 48 hours. If there is no response, a replacement lead will be provided at the same cost after cross-verification by our team.</li>
                                <li>Designers must submit proof (e.g., call log screenshots or message screenshots) to initiate the replacement process.</li>
                                <li>If a client is already working with another designer after our verification, designers should immediately contact us and provide proof, such as screenshots of messages or recorded calls.</li>
                            </ul>
                    </PrivacySection>
                    <PrivacySection title="Non-Eligibility for Replacement">
                        <p>No replacement or refund will be provided if:</p>
                            <ul>
                                <li>The designer or architect has already provided an estimate/quotation to the lead client via call, WhatsApp, email, or in-person meeting.</li>
                            </ul>
                    </PrivacySection>
                </div>
            </div>
            <div className='RP-main-item-conatiner'>
                <div className='RP-header-container'>
                    <h1 className='RP-Main-Header'>REFUND POLICY</h1>
                    <TbCreditCardRefund color='white' size={66} />
                </div>
                <div className='RP-sub-container'>
                    <PrivacySection title="Eligibility for Replacement:">
                            <p>We offer replacements for leads in the following cases:</p>
                            <ul>
                                <li>The client is unresponsive to calls or messages.</li>
                                <li>The client has already engaged another designer for their project despite our verification.</li>
                                <li>The provided contact details are unreachable within 48 hours of lead purchase.</li>
                            </ul>
                            <p>Replacements will be provided based on the cost of the originally purchased lead, ensuring a transparent and fair process in our interior lead generation service.</p>
                    </PrivacySection>
                    <PrivacySection title="Procedure for Replacement">
                        <p>Replacements will be provided at the cost of the originally purchased lead, ensuring transparency and fairness in our lead generation service.</p>
                    </PrivacySection>
                    <PrivacySection title="Cost Basis">
                            <ul>
                                <li>If a client is unresponsive to calls/messages or the contact details are unreachable, designers must follow up diligently for 48 hours. If there is no response, a replacement lead will be provided at the same cost after cross-verification by our team.</li>
                                <li>Designers must submit proof (e.g., call log screenshots or message screenshots) to initiate the replacement process.</li>
                                <li>If a client is already working with another designer after our verification, designers should immediately contact us and provide proof, such as screenshots of messages or recorded calls.</li>
                            </ul>
                    </PrivacySection>
                    <PrivacySection title="Non-Eligibility for Replacement">
                        <p>No replacement or refund will be provided if:</p>
                            <ul>
                                <li>The designer or architect has already provided an estimate/quotation to the lead client via call, WhatsApp, email, or in-person meeting.</li>
                            </ul>
                    </PrivacySection>
                </div>
            </div>
        </div> 
    </div>
  );
};

export default PrivacyPolicy;