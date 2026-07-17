import { useState } from "react";
import "./loadingbutton.css";

const LoadingButton = () => {
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      alert("Success!");
    }, 3000);
  };

  return (
    <button
      className="loading-btn"
      onClick={handleClick}
      disabled={loading}
    >
      {loading ? (
        <>
          <span className="spinner"></span>
          Loading...
        </>
      ) : (
        "Submit"
      )}
    </button>
  );
};

export default LoadingButton;