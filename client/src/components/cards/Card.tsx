import { useDispatch, useSelector } from "react-redux";
import { MdFavorite, MdOutlineFavoriteBorder } from "react-icons/md";
import "./Cards.css";
import { LensData } from "../../@types";
import { useLocation, useNavigate } from "react-router-dom";
import { CiCircleMore } from "react-icons/ci";
import {
  toggleFavorite,
  toggleUnFavorite,
} from "../../features/cards/cardSlice";
import {  useRef } from "react";

interface CardProps {
  lens: LensData;
  token: string;
  clickFavorite: boolean;
  setClickFavorite: any;
}

const Card: React.FC<CardProps> = ({
  lens,
  token,
  clickFavorite,
  setClickFavorite
}) => {
  const location = useLocation();

  const dispatch = useDispatch();
  const favorites = useSelector(
    (state: { favorite: { favorites?: LensData[] } }) =>
      state.favorite.favorites || []
  );
  const isFavorite = favorites.some((favorite) => favorite._id === lens._id);

  const headerRef = useRef<HTMLDivElement>(null);
  const nav = useNavigate();

  const handleFavoriteToggle = () => {
    if (location.pathname === "/favorites") {
      alert("removed from favorites");
      dispatch(toggleUnFavorite(lens));
    } else {
      alert("added to favorites");
      dispatch(toggleFavorite(lens));
    }
    setClickFavorite(!clickFavorite);
  };

  // useEffect(() => {
  //   const headerElement = headerRef.current;
  //   if (headerElement) {
  //     const availableWidth = headerElement.offsetWidth;
  //     const scrollWidth = headerElement.scrollWidth;
  //     if (scrollWidth > availableWidth) {
  //       const fontSize = availableWidth / scrollWidth;
  //       headerElement.style.fontSize = `${fontSize}rem`;
  //     }
  //   }
  // }, []);

  // const FavoriteIcon = isFavorite ? MdFavorite : MdOutlineFavoriteBorder;

  return (
    <div className="card card-size m-2">
      <div className="card-header">
        <div className="header-field" ref={headerRef}>
          {lens.name}
        </div>
      </div>
      <div className="bg-warning text-center lens-category">
        {" "}
        {lens.category}
      </div>
      <div className="card-body">
        <p className="card-field">Index: {lens.index}</p>
        <p className="card-field">Diameter: {lens.diameter}</p>
        <p className="card-field">Minus Range: {lens.sphRange.minus}</p>
        <p className="card-field">Plus Range: {lens.sphRange.plus}</p>
        <p className="card-field">Coating: {lens.coating}</p>
        <p className="card-field lens-price">Price: ₪{lens.price}</p>

        <button
          className="border-0 bg-transparent favorite-icon"
          onClick={handleFavoriteToggle}
        >
          {isFavorite ? <MdFavorite /> : <MdOutlineFavoriteBorder />}
        </button>
        <button
          className="border-0 bg-transparent text-light more-icon"
          onClick={() => {
            nav(`/cards/details/${lens._id}`);
          }}
        >
          <CiCircleMore />
        </button>
      </div>
    </div>
  );
};

export default Card;
