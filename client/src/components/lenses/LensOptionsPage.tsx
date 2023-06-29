import "./lenses.css";
import Card from "../cards/Card";
import { useLocation } from "react-router-dom";
import { LensData, LensFormData } from "../../@types";
import { useState } from "react";
import SortBy from "../utils/SortBy";

const LensOptionsPage = () => {
  const location = useLocation();
  const data = location?.state?.data;
  const formData: LensFormData = data?.formData;
  const token = localStorage.getItem("token");
  const [clickFavorite, setClickFavorite] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState("");

  const handleSortChange = (value: string) => {
    setSortBy(value);
  };

  const filterByCategory = (lens: LensData) => {
    if (sortBy === "") {
      return true;
    } else {
      return lens.category === sortBy;
    }
  };

  return (
    <div className="bg-dark text-light p-5">
      <SortBy onSortChange={handleSortChange} />
      <div className="text-center mobile-mt">
        <p className="mt-2">
          <strong>Prescription R:</strong>{" "}
          {formData && `${formData.sphRight}/ ${formData.cylRight}`}
        </p>
        <h2>Right Eye options:</h2>
      </div>
      {data?.lensOptions?.rightEyeOptions.length === 0 ? (
        <p className="text-center">
          Sorry, there aren't any lens options available.
        </p>
      ) : (
        <div className="d-flex flex-wrap justify-content-center mt-2">
          {data?.lensOptions?.rightEyeOptions
            .filter(filterByCategory)
            .map((lens: LensData) => (
              <div key={lens._id}>
                <Card
                  lens={lens}
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
      <div className="text-center">
        <p>
          <strong>Prescription L:</strong>{" "}
          {formData && ` ${formData.sphLeft}/ ${formData.cylLeft}`}
        </p>
        <h2>Left Eye options:</h2>
      </div>
      {data?.lensOptions?.leftEyeOptions.length === 0 ? (
        <p className="text-center">
          Sorry, there aren't any lens options available.
        </p>
      ) : (
        <div className="d-flex flex-wrap justify-content-center mt-2">
          {data?.lensOptions?.leftEyeOptions
            .filter(filterByCategory)
            .map((lens: LensData) => (
              <div key={lens._id}>
                <Card
                  lens={lens}
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

export default LensOptionsPage;
