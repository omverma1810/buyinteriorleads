import React , {useEffect , useState} from 'react';
import './styles.css'
import { GoArrowDown } from "react-icons/go";
import { HiOutlineArrowLongDown } from "react-icons/hi2";

import axios from 'axios';

import HowItsWorks from './HowItsWorks'
import Benefits from './Benefits'
import Location from './Location-H'

import Productlayout from '../../Components/ProductLayout'

import Aboutus from '../AboutUs'

 
const products = [
    { id: 1, name: "Product A", price: "$20", image: "/Images/delhi.jpg" , discountPrice:'10' },
    { id: 2, name: "Product B", price: "$30", image: "/Images/delhi.jpg", discountPrice:'10' },
    { id: 3, name: "Product C", price: "$40", image: "/Images/delhi.jpg", discountPrice:'10' },
    { id: 4, name: "Product D", price: "$50", image: "/Images/delhi.jpg" , discountPrice:'10'},
    { id: 5, name: "Product E", price: "$60", image: "/Images/delhi.jpg" , discountPrice:'10'},
    { id: 6, name: "Product F", price: "$70", image: "/Images/delhi.jpg", discountPrice:'10' },
    { id: 7, name: "Product G", price: "$80", image: "/Images/delhi.jpg", discountPrice:'10' },
    { id: 8, name: "Product H", price: "$90", image: "/Images/delhi.jpg", discountPrice:'10' }
  ];

const Index = () => {

    const [leads, setLeads] = useState([]);

    console.log('data',leads)



    

    const getLeads = async () => {
      console.log("getLeads function is running...");
      try {
        const response = await axios.get(`https://buyinteriorapp-d0adf77e7c33.herokuapp.com/api/leads/`);

          console.log("API Response:", response.data);
          setLeads(response.data);
      } catch (error) {
          console.error("Error fetching data:", error);
      }
  };
  

  useEffect(() => {
    getLeads();
  }, []);

    
    return (
      <main className="main-content">
        <div className="hero">
          <div className="hero-overlay"></div>
          <div className="container-hero">
            <div className="hero-content">
              <h1>Looking for Verified Interior Leads?</h1>
              <p>
                Let us amplify your ROI and drive exceptional growth. Connect
                with pre-qualified clients actively seeking interior design
                services.
              </p>
              <div className="hero-buttons">
                <button className="start-now">Start Now</button>
                <button className="learn-more">Learn More</button>
              </div>
              <div className="stats">
                <div>
                  <div className="stat-value">500+</div>
                  <div className="stat-label">Active Clients</div>
                </div>
                <div>
                  <div className="stat-value">95%</div>
                  <div className="stat-label">Success Rate</div>
                </div>
                <div>
                  <div className="stat-value">24/7</div>
                  <div className="stat-label">Support</div>
                </div>
              </div>
            </div>
            <div className="hero-image">
              <img
                src="https://public.readdy.ai/ai/img_res/eb01f1ad778e421ba2c431ff2a167b8a.jpg"
                alt="Interior Design Consultation"
              />
            </div>
          </div>
        </div>
        <HowItsWorks />
        <Location />
        <Benefits />
        <div style={{paddingTop:2}} >
          <h1 className="heading-gallery">Leads Gallery</h1>
          <Productlayout products={leads} />
        </div>
      </main>
    );
}

export default Index;
