import { useState } from "react";
import BasicModal from "./BasicModal";
import "./Index.css";

const BasicModalbase = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="container">
      <button
        className="open-btn"
        onClick={() => setIsOpen(true)}
      >
        Open Modal
      </button>

      <BasicModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Basic Modal"
      >
        <p>Welcome to the React Basic Modal!</p>
      </BasicModal>
    </div>
  );
};

export default BasicModalbase;