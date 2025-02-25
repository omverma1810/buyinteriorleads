import React from "react";
import Marquee from "react-fast-marquee";
import "./ReviewMarquee.css"; // Import CSS file for styling

const reviews2 = [
  { name: "Jack", username: "@jack", body: "I've never seen anything like this before. It's amazing. I love it.", img: "https://avatar.vercel.sh/jack" },
  { name: "Jill", username: "@jill", body: "I don't know what to say. I'm speechless. This is amazing.", img: "https://avatar.vercel.sh/jill" },
  { name: "John", username: "@john", body: "I'm at a loss for words. This is amazing. I love it.", img: "https://avatar.vercel.sh/john" },
  { name: "Jane", username: "@jane", body: "I'm at a loss for words. This is amazing. I love it.", img: "https://avatar.vercel.sh/jane" },
  { name: "Jenny", username: "@jenny", body: "I'm at a loss for words. This is amazing. I love it.", img: "https://avatar.vercel.sh/jenny" },
  { name: "James", username: "@james", body: "I'm at a loss for words. This is amazing. I love it.", img: "https://avatar.vercel.sh/james" },
];

const reviews = [
    {
      name: "Sarah Johnson",
      username: "@sarahj_designs",
      body: "The design team transformed my home beautifully. Highly recommended!",
      img: "https://randomuser.me/api/portraits/women/11.jpg",
      location: "New York, NY",
      rating: 5
    },
    {
      name: "David Miller",
      username: "@davidm_interiors",
      body: "Amazing results, stylish and functional space within budget!",
      img: "https://randomuser.me/api/portraits/men/22.jpg",
      location: "San Francisco, CA",
      rating: 4
    },
    {
      name: "Emily Clark",
      username: "@emilyc_decor",
      body: "The office space looks fantastic, and the team nailed the vision!",
      img: "https://randomuser.me/api/portraits/women/15.jpg",
      location: "Chicago, IL",
      rating: 5
    },
    {
      name: "Michael Brown",
      username: "@michaelb_design",
      body: "Impressive design, quality materials, and expert craftsmanship!",
      img: "https://randomuser.me/api/portraits/men/33.jpg",
      location: "Los Angeles, CA",
      rating: 4
    },
    {
      name: "Olivia Roberts",
      username: "@oliviar_decor",
      body: "Perfect balance of comfort and modern style. I'm thrilled with the results!",
      img: "https://randomuser.me/api/portraits/women/20.jpg",
      location: "Miami, FL",
      rating: 5
    },
    {
      name: "James Wilson",
      username: "@jamesw_interior",
      body: "Creativity and professionalism are top-notch. Highly satisfied!",
      img: "https://randomuser.me/api/portraits/men/44.jpg",
      location: "Austin, TX",
      rating: 5
    }
  ];
  
  

const firstRow = reviews.slice(0, reviews.length / 2);
const secondRow = reviews.slice(reviews.length / 2);

const ReviewMarquee = () => {
  return (
    <div className="review-container">
      <Marquee pauseOnHover speed={40} gradient={false} loop={0}>
        {firstRow.concat(firstRow).map((item, index) => (
          <figure key={index} className="review-card">
            <div className="review-header">
              <img className="avatar" alt="" src={item.img} />
              <div className="review-user">
                <figcaption className="marque-name">{item.name}</figcaption>
              </div>
            </div>
            <p className="review-text">{item.body}</p>
          </figure>
        ))}
      </Marquee>

      <Marquee pauseOnHover speed={40} gradient={false} loop={0} direction="right">
        {secondRow.concat(secondRow).map((item, index) => (
          <figure key={index} className="review-card">
            <div className="review-header">
              <img className="avatar" alt="" src={item.img} />
              <div className="review-user">
                <figcaption className="marque-name">{item.name}</figcaption>
                <p className="username">{item.username}</p>
              </div>
            </div>
            <p className="review-text">{item.body}</p>
          </figure>
        ))}
      </Marquee>
    </div>
  );
};

export default ReviewMarquee;
