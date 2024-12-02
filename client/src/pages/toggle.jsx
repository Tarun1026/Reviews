import React, { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

function ToggleContent() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleContent = () => {
    setIsOpen(!isOpen); // Toggle the state
  };

  return (
    <div>
      <div
        onClick={toggleContent}
        style={{ cursor: "pointer", display: "flex", alignItems: "center" }}
      >
        <span>Click to {isOpen ? "Hide" : "Show"} Content</span>
        {isOpen ? <FaChevronUp /> : <FaChevronDown />}
      </div>
      {isOpen && (
        <div style={{ marginTop: "10px", padding: "10px", border: "1px solid #ccc" }}>
          This is the toggled content. It appears and disappears when you click the arrow.
        </div>
      )}
    </div>
  );
}

export default ToggleContent;
