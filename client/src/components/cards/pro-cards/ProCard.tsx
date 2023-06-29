import { useContext, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  toggleFavorite,
  toggleUnFavorite,
} from "../../../features/cards/proCardSlice";
import { MdFavorite, MdOutlineFavoriteBorder } from "react-icons/md";
import { ProLensData } from "../../../@types";
import "./ProCards.css";
import { useLocation, useNavigate } from "react-router-dom";
import { CiCircleMore } from "react-icons/ci";
import FavAlert from "../../utils/FavAlert";
import AuthContext from "../../../context/AuthContext";

interface CardProps {
  proLens: ProLensData;
  token: string;
  clickFavorite: boolean;
  setClickFavorite: any;
}

const ProCard: React.FC<CardProps> = ({
  proLens,
  token,
  clickFavorite,
  setClickFavorite,
}) => {
  const location = useLocation();

  const dispatch = useDispatch();
  const favoritesPro = useSelector(
    (state: { favoritePro: { favoritesPro?: ProLensData[] } }) =>
      state.favoritePro.favoritesPro || []
  );

  const isFavorite = favoritesPro.some(
    (favoritePro) => favoritePro._id === proLens._id
  );
const { isLoggedIn } = useContext(AuthContext);

  const headerRef = useRef<HTMLDivElement>(null);
  const nav = useNavigate();

  const handleFavoriteToggle = () => {
    if (location.pathname === "/favorites") {
      FavAlert({ title: "removed from favorites" });
      dispatch(toggleUnFavorite(proLens));
    } else {
      FavAlert({ title: "added to favorites" });
      dispatch(toggleFavorite(proLens));
    }
    setClickFavorite(!clickFavorite);
  };

  useEffect(() => {
    const headerElement = headerRef.current;
    if (headerElement) {
      const availableWidth = headerElement.offsetWidth;
      const scrollWidth = headerElement.scrollWidth;
      if (scrollWidth > availableWidth) {
        const fontSize = availableWidth / scrollWidth;
        headerElement.style.fontSize = `${fontSize}rem`;
      }
    }
  }, []);

  return (
    <div className="card card-size m-2">
      <div className="card-header">
        <div className="header-field" ref={headerRef}>
          {proLens.name}
        </div>
      </div>
      <div className="bg-warning text-center lens-category">
        {" "}
        {proLens.lensType}
      </div>
      <div className="card-body">
        <p className="card-field">Index: {proLens.index}</p>
        <p className="card-field">Diameter: {proLens.diameter}</p>
        <p className="card-field">Minus Range: {proLens.sphRange.minus}</p>
        <p className="card-field">Plus Range: {proLens.sphRange.plus}</p>
        <p className="card-field">Coating: {proLens.coating}</p>
        <p className="card-field lens-price">Price: ₪{proLens.price}</p>
        {isLoggedIn && (
          <>
            <button
              className="border-0 bg-transparent favorite-icon"
              onClick={handleFavoriteToggle}
            >
              {isFavorite ? <MdFavorite /> : <MdOutlineFavoriteBorder />}
            </button>
            <button
              className="border-0 bg-transparent text-light more-icon"
              onClick={() => {
                nav(`/pro-cards/details/${proLens._id}`);
              }}
            >
              <CiCircleMore />
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ProCard;
