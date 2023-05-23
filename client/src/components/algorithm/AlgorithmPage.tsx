import { useState } from "react";
import { NavLink, Route, Routes } from "react-router-dom";
import SingleVisionForm from "../forms/SingleVisionForm";
import ProgressiveForm from "../forms/ProgressiveForm";
import "./AlgorithmPage.css";

const AlgorithmPage = () => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
  };

  return (
    <div className="algorithm-page">
      <div className="select-options bg-dark d-flex justify-content-center align-items-center vh-100">
        <NavLink
          to="/algorithm/single"
          className="btn btn-warning btn-select p-3 m-3"
          onClick={() => handleOptionSelect("single")}
        >
          <h2> Single Vision</h2>
        </NavLink>
        <NavLink
          to="/algorithm/progressive"
          className="btn btn-warning p-3 m-3 btn-select"
          onClick={() => handleOptionSelect("progressive")}
        >
          <h2> Progressive</h2>
        </NavLink>
      </div>

      {/* Render the form component based on the selected option */}
      <div className="form-container">
        <Routes>
          <Route path="/algorithm/single" element={<SingleVisionForm />} />
          <Route path="/algorithm/progressive" element={<ProgressiveForm />} />
        </Routes>
      </div>
    </div>
  );
};

export default AlgorithmPage;
