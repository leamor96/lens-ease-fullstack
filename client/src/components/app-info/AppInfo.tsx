import "./AppInfo.css";
import { NavLink } from "react-router-dom";

const AppInfo = () => {

  return (
    <div className="text-light bg-dark d-flex justify-content-center align-items-center vh-100">
      <div className="text-center">
        <h1>Welcome to PRICER</h1>
        <p>
          This app helps you calculate the appropriate lens options based on
          your patient's prescription and measurements.
        </p>
        <NavLink to="/algorithm" className="btn btn-warning p-3 btn-start">
          Start Calculating
        </NavLink>
      </div>
    </div>
  );
};

export default AppInfo;
