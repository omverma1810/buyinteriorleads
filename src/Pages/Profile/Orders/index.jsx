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

  console.log(matchedLeads, "matched leads");

  const doc = new jsPDF();
  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.text("Leads Details", 10, 10);

  let y = 25;
  const pageHeight = doc.internal.pageSize.height;

  matchedLeads.forEach((lead, index) => {
    if (y + 100 > pageHeight) {
      doc.addPage();
      y = 25;
      doc.setFontSize(16);
      doc.text("Leads Details (Continued)", 10, 10);
    }

    doc.setFontSize(12);

    // Function to format numbers (Indian style)
    const formatCurrency = (num) => {
      return num ? `₹${num.toLocaleString("en-IN")}` : "N/A";
    };

    // Create a structured format
    const keyX = 10; // X position for keys
    const valueX = 80; // X position for values (increased for better spacing)


    const formatDate = (dateString) => {
      if (!dateString) return "N/A";
      const date = new Date(dateString);
      return date.toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
    };

    doc.setFont("helvetica", "bold");
    doc.text(`Lead ID:`, keyX, y);
    doc.setFont("helvetica", "normal");
    doc.text(`${lead.id || "N/A"}`, valueX, y);

    doc.setFont("helvetica", "bold");
    doc.text(`Name:`, keyX, y + 8);
    doc.setFont("helvetica", "normal");
    doc.text(`${lead.name || "N/A"}`, valueX, y + 8);

    doc.setFont("helvetica", "bold");
    doc.text(`Location:`, keyX, y + 16);
    doc.setFont("helvetica", "normal");
    doc.text(`${lead.location || "N/A"}`, valueX, y + 16);

    doc.setFont("helvetica", "bold");
    doc.text(`Property Type:`, keyX, y + 24);
    doc.setFont("helvetica", "normal");
    doc.text(`${lead.property_type || "N/A"}`, valueX, y + 24);

    doc.setFont("helvetica", "bold");
    doc.text(`Property Status:`, keyX, y + 32);
    doc.setFont("helvetica", "normal");
    doc.text(`${lead.property_status || "N/A"}`, valueX, y + 32);

    doc.setFont("helvetica", "bold");
    doc.text(`Service Required On:`, keyX, y + 40);
    doc.setFont("helvetica", "normal");
    doc.text(`${lead.service_required_on || "N/A"}`, valueX, y + 40);

    doc.setFont("helvetica", "bold");
    doc.text(`Budget:`, keyX, y + 48);
    doc.setFont("helvetica", "normal");
    doc.text(formatCurrency(lead.budget), valueX, y + 48);

    doc.setFont("helvetica", "bold");
    doc.text(`Requirement:`, keyX, y + 56);
    doc.setFont("helvetica", "normal");
    doc.text(`${lead.requirement || "N/A"}`, valueX, y + 56);

    doc.setFont("helvetica", "bold");
    doc.text(`Tags:`, keyX, y + 64);
    doc.setFont("helvetica", "normal");
    doc.text(`${lead.tags || "N/A"}`, valueX, y + 64);

    doc.setFont("helvetica", "bold");
    doc.text(`Price:`, keyX, y + 72);
    doc.setFont("helvetica", "normal");
    doc.text(formatCurrency(lead.price), valueX, y + 72);

    doc.setFont("helvetica", "bold");
    doc.text(`Discount Price:`, keyX, y + 80);
    doc.setFont("helvetica", "normal");
    doc.text(formatCurrency(lead.discount_price), valueX, y + 80);

    doc.setFont("helvetica", "bold");
    doc.text(`Mobile Number:`, keyX, y + 88);
    doc.setFont("helvetica", "normal");
    doc.text(`${lead.mobile_number || "N/A"}`, valueX, y + 88);

    doc.setFont("helvetica", "bold");
    doc.text(`Available:`, keyX, y + 96);
    doc.setFont("helvetica", "normal");
    doc.text(`${lead.available ? "Yes" : "No"}`, valueX, y + 96);

    doc.setFont("helvetica", "bold");
    doc.text(`Sold Out:`, keyX, y + 104);
    doc.setFont("helvetica", "normal");
    doc.text(`${lead.sold_out ? "Yes" : "No"}`, valueX, y + 104);

    doc.setFont("helvetica", "bold");
    doc.text(`Created At:`, keyX, y + 112);
    doc.setFont("helvetica", "normal");
    doc.text(formatDate(lead.created_at), valueX, y + 112);

    // Add a separator line
    doc.setFont("helvetica", "bold");
    doc.text(
      "------------------------------------------------------------",
      keyX,
      y + 120
    );

    y += 130;
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
