import React, { useState, useRef, useEffect } from "react";

const Dropdown = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [height, setHeight] = useState(0);
  const contentRef = useRef(null);

  useEffect(() => {
    if (contentRef.current) {
      setHeight(isOpen ? contentRef.current.scrollHeight : 0);
    }
  }, [isOpen]);

  return (
    <div className="dropdown-container">
      <button className="dropdown-button" onClick={() => setIsOpen(!isOpen)}>
        {title}
      </button>
      <div
        className="dropdown-content"
        ref={contentRef}
        style={{ height: `${height}px` }}
      >
        {children}
      </div>
    </div>
  );
};

export default Dropdown;
