import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import './index.css'

const PrivacySection = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="privacy-section">
      <div 
        onClick={() => setIsOpen(!isOpen)} 
        className="section-header"
      >
        <h2>{title}</h2>
        <ChevronDown 
          className={`chevron-icon ${isOpen ? 'rotated' : ''}`} 
        />
      </div>
      <div 
        className={`section-content ${isOpen ? 'open' : ''}`}
      >
        <div className="content-inner">
          {children}
        </div>
      </div>
    </div>
  );
};

const PrivacyPolicy = () => {
  return (
    <div className='PP-conatiner'>
        <div className="privacy-row-wrapper">
            <div className="privacy-left-panel">
                <h1 className='PP-heading'>Privacy Policy</h1>
                <p>Comprehensive Overview of Our Data Protection Practices</p>
            </div>
            <div className="privacy-right-panel">
                <div className="scrollable-content">
                <PrivacySection title="Data We Collect">
                    <p>We collect data through various interactions:</p>
                    <ul>
                        <li>Name, email, phone number, and business information.</li>
                        <li>Payment details securely processed via third-party gateways.</li>
                        <li>Website activity such as IP address, browser type, and pages visited.</li>
                    </ul>
                </PrivacySection>

                <PrivacySection title="How We Use Your Data">
                <p>We utilize your information for the following purposes:</p>
                    <ul>
                        <li>Facilitating lead generation and enhancing user experience.</li>
                        <li>Sending updates, newsletters, and promotional materials (opt-out available).</li>
                        <li>Analyzing usage data to improve our services.</li>
                    </ul>
                </PrivacySection>

                <PrivacySection title="Data Sharing & Disclosure">
                <p>We may share your information under these conditions:</p>
                    <ul>
                        <li>With trusted third-party vendors who assist in operations under strict confidentiality.</li>
                        <li>In compliance with legal requirements or requests from authorities.</li>
                    </ul>
                </PrivacySection>

                <PrivacySection title="Security Measures">
                    <p>We implement safeguards to protect your data, though no system is entirely secure.</p>
                    <ul>
                        <li>Access and modify your personal data upon request.</li>
                        <li>Opt out of marketing emails at any time.</li>
                    </ul>
                </PrivacySection>
                </div>
            </div>
        </div> 
        <div className='PP-text-container' style={{color:'black'}}>
            <h1>Cookies & Tracking</h1>
            <p>Our website utilizes cookies and similar tracking technologies to improve user experience. You have the option to accept or reject cookies; however, declining them may limit your access to certain features of the website.</p>

            <h1>Policy Updates</h1>
            <p>We may revise this Privacy Policy periodically. Any modifications will be reflected on this page with an updated effective date. We recommend reviewing this policy regularly to stay informed about any changes.</p>
        </div>      
    </div>
  );
};

export default PrivacyPolicy;