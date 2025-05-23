import React from "react";
import { useLocation } from "react-router-dom";
import "./FormPage.css";

const SuccessPage = () => {
  const { state } = useLocation();
  return (
    <div className="form-container">
      <h2>Submission Successful!</h2>
      <ul>
        {Object.entries(state).map(([key, value]) => (
          <li key={key}><strong>{key}:</strong> {value}</li>
        ))}
      </ul>
    </div>
  );
};

export default SuccessPage;