import React from 'react';
import './location.css'


const data = [
    { image: '/Images/delhi.jpg', text: 'Delhi' },
    { image: '/Images/hyderabad.jpg', text: 'Hyderabad' },
    { image: '/Images/ahmedabad.jpg', text: 'Ahmedabad' },
    { image: '/Images/banglore.jpg', text: 'Banglore' },
    { image: '/Images/surat.jpg', text: 'surat' },
    { image: '/Images/kolkata.jpg', text: 'kolkata' },
    { image: '/Images/lucknow.jpg', text: 'Luncknow' },
    { image: '/Images/mumbai.jpg', text: 'Mumbai' },
    { image: '/Images/pune.jpg', text: 'Pune' },
  ];

const Index = () => {
    return (
        <div className='main-L'>
            <div className='header-L'>
                <h1 className='Header'>Select Your City</h1>
            </div>
            <div className="container-S">
                {data.map((item) => (
                    <div
                    key={item.id}
                    className="image-card"
                    style={{ backgroundImage: `url(${item.image})` }}
                    >
                    <div className="overlay"></div>
                    <div className="text">{item.text}</div>
                    </div>
                ))}
            </div>
            
        </div>
    );
}

export default Index;
