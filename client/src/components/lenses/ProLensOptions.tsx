import { ProLensData } from "../../@types";
import { useLocation } from "react-router-dom";
import ProCard from "../cards/pro-cards/ProCard";


const ProLensOptions = () => {
  const location = useLocation();
  const data = location?.state?.data;
  const token = localStorage.getItem("token");

  return (
    <div className="bg-dark text-light p-3">
      <h2 className="text-center">Right Eye options:</h2>
      <div className="d-flex flex-wrap justify-content-center">
        {data?.proLensOptions?.rightEyeOptions.map((proLens: ProLensData) => (
          <div key={proLens._id}>
            <ProCard proLens={proLens} token={token || ""} />
          </div>
        ))}
      </div>
      <br />
      <h2 className="text-center">Left Eye options:</h2>
      <div className="d-flex flex-wrap justify-content-center">
        {data?.proLensOptions?.leftEyeOptions.map((proLens: ProLensData) => (
          <div key={proLens._id}>
            <ProCard proLens={proLens} token={token || ""} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProLensOptions;
