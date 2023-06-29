import { ProLensData } from "../../@types";
import { useLocation } from "react-router-dom";
import ProCard from "../cards/pro-cards/ProCard";
import { useState } from "react";

const ProLensOptions = () => {
  const location = useLocation();
  const data = location?.state?.data;
  const token = localStorage.getItem("token");
  const [clickFavorite, setClickFavorite] = useState<boolean>(false);

  return (
    <div className="bg-dark text-light p-5">
      <h2 className="text-center mt-2">Right Eye options:</h2>
      {data?.proLensOptions?.rightEyeOptions.length === 0 ? (
        <p className="text-center">
          Sorry, there aren't any lens options available.
        </p>
      ) : (
        <div className="d-flex flex-wrap justify-content-center">
          {data?.proLensOptions?.rightEyeOptions.map((proLens: ProLensData) => (
            <div key={proLens._id}>
              <ProCard
                proLens={proLens}
                token={token || ""}
                clickFavorite={clickFavorite}
                setClickFavorite={setClickFavorite}
              />
            </div>
          ))}
        </div>
      )}
      <br />
      <hr className="my-hr" />
      <h2 className="text-center">Left Eye options:</h2>
      {data?.proLensOptions?.leftEyeOptions.length === 0 ? (
        <p className="text-center">
          Sorry, there aren't any lens options available.
        </p>
      ) : (
        <div className="d-flex flex-wrap justify-content-center">
          {data?.proLensOptions?.leftEyeOptions.map((proLens: ProLensData) => (
            <div key={proLens._id}>
              <ProCard
                proLens={proLens}
                token={token || ""}
                clickFavorite={clickFavorite}
                setClickFavorite={setClickFavorite}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProLensOptions;
