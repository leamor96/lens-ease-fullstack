import { ProLensData } from "../../@types";
import { useLocation } from "react-router-dom";
import ProCard from "../cards/pro-cards/ProCard";


const ProLensOptions = () => {
  const location = useLocation();
  const data = location?.state?.data;
  const token = localStorage.getItem("token");

  return (
    <div className="bg-dark text-light p-5">
      <h2>Right Eye options:</h2>
      <div className="d-flex flex-wrap">
        {data?.lensOptions?.rightEyeOptions.map((proLens: ProLensData) => (
          <div key={proLens._id}>
            <ProCard proLens={proLens} token={token || ""} />
          </div>
        ))}
      </div>
      <br />
      <h2>Left Eye options:</h2>
      <div className="d-flex flex-wrap">
        {data?.lensOptions?.leftEyeOptions.map((proLens: ProLensData) => (
          <div key={proLens._id}>
            <ProCard proLens={proLens} token={token || ""} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProLensOptions;
