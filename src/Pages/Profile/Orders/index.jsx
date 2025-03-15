import { useState , useContext } from "react";
import "./index.css";
import { DataContext } from "../../../ContextAPI";

const OrderCard = ({order}) => {


  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert("Copied to clipboard: " + text);
  };

  return (
    <div className="order-card">
      <div className="order-header">
        <div>
          <div className="order-id">
            <h2>Order #{order.id}</h2>
            <button
              onClick={() => copyToClipboard(order.id)}
              className="copy-btn"
            >
              <i className="ri-file-copy-line"></i>
            </button>
          </div>
          <p className="razorpay-id">Razorpay ID: {order.razorpay_order_id}</p>
        </div>
        <div className="order-status">
          <span className="status-badge">{order.payment_status}</span>
          <p className="order-date">{order.created_at}</p>
        </div>
      </div>

      <div className="order-section">
        <div className="address-icon">
          <i className="ri-map-pin-line"></i>
        </div>
        <div>
          <h3 className="section-title">Delivery Address</h3>
          <p className="address-text">{order.street}</p>
          <p className="address-text">{order.city}</p>
        </div>
      </div>

      <div className="order-section">
        <h3 className="section-title">Order Items</h3>
        <div className="order-items">
          {order.items.map((item, index) => (
            <div key={index} className="order-item">
              <div>
                <p className="item-name">{item.id}</p>
                <p className="item-quantity">Quantity: {item.quantity}x</p>
              </div>
              <p className="item-price">
                ₹{(item.price * item.quantity).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="order-section">
        <div className="pricing-info">
          <div className="pricing-row">
            <span>Subtotal</span>
            <span>₹{order.subtotal}</span>
          </div>
          <div className="pricing-row">
            <span>GST (18%)</span>
            <span>₹{order.gst}</span>
          </div>
          <div className="pricing-total">
            <span>Total</span>
            <span>₹{order.total}</span>
          </div>
        </div>
      </div>

      <div className="order-actions">
        <button className="btn-secondary">Download Invoice</button>
        <button className="btn-primary">Track Order</button>
      </div>
    </div>
  );
};

const OrdersList = () => {
  const { orders } = useContext(DataContext);
  return (
    <div className="orders-list">
      {orders.length > 0 ? (
        orders.map((order, index) => <OrderCard key={index} order={order} />)
      ) : (
        <p>No orders found.</p>
      )}
    </div>
  );
};

export default OrdersList;
