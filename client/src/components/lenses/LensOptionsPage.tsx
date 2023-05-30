import { useSelector } from "react-redux";
import { selectLensData } from "../../features/lenses/lensSlice";
import Card from "../cards/Card"

const LensOptionsPage = () => {
  const lensData = useSelector(selectLensData);

  return (
    <div className="container p-2 d-flex flex-wrap">
      {/* Render the cards based on the lens data */}
      {lensData.map((lens) => (
        <div key={lens._id} className="card">
          <Card lens={lens} isFavorite={false}/>
        </div>
      ))}
    </div>
  );
};

export default LensOptionsPage;
