import "./lenses.css"
import Card from "../cards/Card";
import { useLocation } from "react-router-dom";
import { LensData, LensFormData } from "../../@types";

const LensOptionsPage = () => {
  const location = useLocation();
  const data = location?.state?.data;
  const formData: LensFormData = data?.formData;
  const token= localStorage.getItem("token")

  return (
    <div className="bg-dark text-light p-3">
      <div className="text-center">
        <p>
          <strong>Prescription R:</strong>{" "}
          {formData && `${formData.sphRight}/ ${formData.cylRight}`}
        </p>
        <h2>Right Eye options:</h2>
      </div>

      <div className="d-flex flex-wrap justify-content-center">
        {data?.lensOptions?.rightEyeOptions.map((lens: LensData) => (
          <div key={lens._id}>
            <Card lens={lens} token={token || ""} />
          </div>
        ))}
      </div>
      <br />
      <div className="text-center">
          <p>
        <strong>Prescription L:</strong>{" "}
        {formData && ` ${formData.sphLeft}/ ${formData.cylLeft}`}
      </p>
      <h2>Left Eye options:</h2>
      </div>
    
      <div className="d-flex flex-wrap justify-content-center">
        {data?.lensOptions?.leftEyeOptions.map((lens: LensData) => (
          <div key={lens._id}>
            <Card lens={lens} token={token || ""} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default LensOptionsPage;
