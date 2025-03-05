import React , {useEffect, useState} from "react";
import Marquee from "react-fast-marquee";
import "./ReviewMarquee.css";

import axios from 'axios';




const gradients = [
  "linear-gradient(to right, #3498db, #9b59b6)",  
  "linear-gradient(to right, #e74c3c, #f39c12)",  
  "linear-gradient(to right, #2ecc71, #1abc9c)",  
  "linear-gradient(to right, #8e44ad, #3498db)",  
  "linear-gradient(to right, #e67e22, #f1c40f)"   
];




const ReviewMarquee = () => {

  const[reviews , setReviews] = useState([])

  const totalStars = 5;

  const getReview = async () => {
    try {
      const response = await axios.get(`https://buyinteriorapp-d0adf77e7c33.herokuapp.com/api/leads/reviews/`);

        console.log("API Response:", response.data);
        setReviews(response.data);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
};


    useEffect(() => {
      getReview();
    }, []);

    const firstRow = reviews.slice(0, reviews.length / 2);
    const secondRow = reviews.slice(reviews.length / 2);
  return (
    <div className="review-container">
      <Marquee pauseOnHover speed={40} gradient={false} loop={0}>
        {firstRow.concat(firstRow).map((item, index) => (
          <figure key={index} className="review-card">
            <div className="review-header">
              <div className='gradient' style={{
                background: gradients[index % gradients.length],
                width: "40px",
                height: "40px",
                borderRadius: "50%"
              }}></div>
              <div className="review-user">
                <figcaption className="marque-name">{item.name}</figcaption>
                <figcaption style={{color:'#444' , fontSize:12}}>{item.email}</figcaption>
              </div>
            </div>
            <p className="review-text">{item.review_text}</p>
            {[...Array(totalStars)].map((_, index) => (
              <span key={index}>{index < item.rating ? "\u2605" : "\u2606"}</span>
            ))}
          </figure>
        ))}
      </Marquee>

      <Marquee pauseOnHover speed={40} gradient={false} loop={0} direction="right">
        {secondRow.concat(secondRow).map((item, index) => (
          <figure key={index} className="review-card">
            <div className="review-header">
              <div className='gradient' style={{
                background: gradients[index % gradients.length],
                width: "40px",
                height: "40px",
                borderRadius: "50%"
              }}></div>
              <div className="review-user">
                <figcaption className="marque-name">{item.name}</figcaption>
                <figcaption style={{color:'#444' , fontSize:12}}>{item.email}</figcaption>
              </div>
            </div>
            <p className="review-text">{item.review_text}</p>
            {[...Array(totalStars)].map((_, index) => (
              <span key={index}>{index < item.rating ? "\u2605" : "\u2606"}</span>
            ))}
          </figure>
        ))}
      </Marquee>
    </div>
  );
};

export default ReviewMarquee;
