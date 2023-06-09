import Card from "../cards/Card";
import { useLocation } from "react-router-dom";

const LensOptionsPage = () => {
  const location = useLocation();
  // const lensData = useSelector(selectLensOptions);
  const data = location?.state?.data;

  return (
    <div className="container p-2 text-center">
      <h2>Right Eye options:</h2>
      <div className="d-flex flex-wrap justify-content-center">
        {/* Render the cards for right eye options */}
        {data?.lensOptions?.rightEyeOptions.map((lens: any) => (
          <div key={lens._id} className="card">
            <Card lens={lens} isFavorite={false} />
          </div>
        ))}
      </div>
      <br />
      <h2>Left Eye options:</h2>
      <div className="d-flex flex-wrap justify-content-center">
        {/* Render the cards for left eye options */}
        {data?.lensOptions?.leftEyeOptions.map((lens: any) => (
          <div key={lens._id} className="card">
            <Card lens={lens} isFavorite={false} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default LensOptionsPage;
