import { useState } from "react";
import Button from "react-bootstrap/Button";
import "./AlgorithmPage.css"

const AlgorithmPage = () => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
  };
  return (
    <div className="algorithm-page">
      <div className="select-options bg-dark d-flex justify-content-center align-items-center vh-100">
        <Button
          variant={selectedOption === "single" ? "light" : "outline-dark"}
          onClick={() => handleOptionSelect("single")}
          className="btn-warning btn-select p-3 m-3"
        >
          <h2> Single Vision</h2>
        </Button>
        <Button
          variant={selectedOption === "progressive" ? "light" : "outline-dark"}
          onClick={() => handleOptionSelect("progressive")}
          className="btn-warning p-3 m-3 btn-select"
        >
          <h2> Progressive</h2>
        </Button>
      </div>

      {/* Render the form component based on the selected option */}
      {selectedOption && (
        <div className="form-container">
          {/* Add your form components here */}
        </div>
      )}
    </div>
  );
};

export default AlgorithmPage;
