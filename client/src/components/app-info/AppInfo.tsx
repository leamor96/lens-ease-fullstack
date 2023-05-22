import { useState } from "react";

const AppInfo = () => {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-dark text-light">
      <div className="container text-center">
        <h1>Welcome to PRICER</h1>
        <p>
          This app helps you calculate the appropriate lens options based on
          your patient's prescription and measurements.
        </p>
        <button className="btn btn-warning">Start Calculating</button>
      </div>
    </div>
  );
};

export default AppInfo;
