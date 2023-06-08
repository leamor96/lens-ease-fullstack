import Card from "../cards/Card";
import { useLocation } from "react-router-dom";

const LensOptionsPage = () => {
  const location =useLocation();
  // const lensData = useSelector(selectLensOptions);
  const data = location?.state?.data;
  console.log("data", data.lensData);
  
  return (
    <div className="container p-2 d-flex flex-wrap">
      {/* Render the cards for right eye options */}
      {data?.lensOptions?.rightEyeOptions.map((lens: any) => (
        <div key={lens._id} className="card">
          <Card lens={lens} isFavorite={false} />
        </div>
      ))}

      {/* Render the cards for left eye options */}
      {data?.lensOptions?.leftEyeOptions.map((lens: any) => (
        <div key={lens._id} className="card">
          <Card lens={lens} isFavorite={false} />
        </div>
      ))}
    </div>
  );
};

export default LensOptionsPage;
