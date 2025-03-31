import { useState , useContext } from "react";
import "./index.css";
import { DataContext } from "../../../ContextAPI";
import jsPDF from "jspdf";




const OrderCard = ({order}) => {

    const {leads } =
      useContext(DataContext);


   const getLeadsForOrder = () => {
     return order.items
       .map((item) => leads.find((lead) => lead.id === item.lead_id))
       .filter((lead) => lead); 
   };


  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert("Copied to clipboard: " + text);
  };

  const downloadLeadsPDF = () => {
     if (order.payment_status !== "Paid") return;
    const matchedLeads = getLeadsForOrder();
    if (matchedLeads.length === 0) {
      alert("No leads found for this order.");
      return;
    }

    console.log(matchedLeads, 'mateched leads')

    const doc = new jsPDF();
    doc.setFontSize(14);
    doc.text("Leads Details", 10, 10);

    matchedLeads.forEach((lead, index) => {
      const y = 20 + index * 50; // Adjust Y position for each lead
      doc.text(`Lead ID: ${lead.id}`, 10, y);
      doc.text(`Name: ${lead.name}`, 10, y + 6);
      doc.text(`Location: ${lead.location}`, 10, y + 12);
      doc.text(`Property Type: ${lead.property_type}`, 10, y + 18);
      doc.text(`Property Status: ${lead.property_status}`, 10, y + 24);
      doc.text(`Service Required On: ${lead.service_required_on}`, 10, y + 30);
      doc.text(`Budget: ₹${lead.budget}`, 10, y + 36);
      doc.text(`Requirement: ${lead.requirement}`, 10, y + 42);
      doc.text(`Tags: ${lead.tags}`, 10, y + 48);
      doc.text(`Price: ₹${lead.price}`, 10, y + 54);
      doc.text(`Discount Price: ₹${lead.discount_price}`, 10, y + 60);
      doc.text(`Discount Price: ₹${lead.mobile_number}`, 10, y + 60);
      doc.text(`Available: ${lead.available ? "Yes" : "No"}`, 10, y + 66);
      doc.text(`Sold Out: ${lead.sold_out ? "Yes" : "No"}`, 10, y + 72);
      doc.text(`Created At: ${lead.created_at}`, 10, y + 78);
      doc.text("--------------------------------------------", 10, y + 84);
    });

    doc.save(`Leads_Order_${order.id}.pdf`);
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
        <button
          className={`btn-secondary ${
            order.payment_status !== "Paid" ? "disabled-btn" : ""
          }`}
          onClick={downloadLeadsPDF}
          disabled={order.payment_status !== "Paid"}
        >
          Download Lead(s)
        </button>
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
