import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LensData, ProLensData } from "../../@types";
import { AppDispatch, RootState } from "../../app/store";
import { fetchFavoriteLenses } from "../../features/favoriteSlice";
import Card from "./Card";
import "./Cards.css";
import ProCard from "./pro-cards/ProCard";
import { fetchFavoriteProLenses } from "../../features/favoriteProSlice";

const Favorites = () => {
  const dispatch = useDispatch<AppDispatch>();
  const favorites = useSelector((state: RootState) => state.favorite.favorites);
  const favoritesPro = useSelector(
    (state: RootState) => state.favoritePro.favoritesPro
  );
  const token = localStorage.getItem("token");

  useEffect(() => {
    dispatch(fetchFavoriteLenses());
    dispatch(fetchFavoriteProLenses());
  }, [dispatch]);

  return (
    <div className="bg-dark text-light p-5">
      <h2>Single Vision Favorites:</h2>
      <div className="d-flex flex-wrap">
        {favorites.map((lens: LensData) => (
          <div key={lens._id}>
            <Card lens={lens} token={token || ""} />
          </div>
        ))}
      </div>
      <br />
      <h2>Progressive Favorites:</h2>
      <div className="d-flex flex-wrap">
        {favoritesPro.map((proLens: ProLensData) => (
          <div key={proLens._id}>
            <ProCard proLens={proLens} token={token || ""} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Favorites;
