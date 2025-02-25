import React from 'react';
// import './Orders.css';

const Orders = () => (
    <div className="orders-page">
        <h2>Orders</h2>
        <p>Here are your recent orders:</p>
        <ul>
            <li>Order #12345 - Delivered</li>
            <li>Order #12346 - Shipped</li>
            <li>Order #12347 - Processing</li>
        </ul>
    </div>
);

export default Orders;