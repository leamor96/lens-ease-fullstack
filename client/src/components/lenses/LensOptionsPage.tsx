import { useSelector } from "react-redux";
import { selectLensOptions } from "../../features/lenses/lensSlice"; 
import Card from "../cards/Card";

const LensOptionsPage = () => {
  const lensData = useSelector(selectLensOptions);
console.log(lensData);
  return (
    <div className="container p-2 d-flex flex-wrap">
      {/* Render the cards for right eye options */}
      {lensData.rightEyeOptions.map((lens) => (
        <div key={lens._id} className="card">
          <Card lens={lens} isFavorite={false} />
        </div>
      ))}
   
      {/* Render the cards for left eye options */}
      {lensData.leftEyeOptions.map((lens) => (
        <div key={lens._id} className="card">
          <Card lens={lens} isFavorite={false} />
        </div>
      ))}
    </div>
  );
};

export default LensOptionsPage;
