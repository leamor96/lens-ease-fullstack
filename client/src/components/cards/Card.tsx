
import { useDispatch ,useSelector} from "react-redux";

import { MdFavorite, MdOutlineFavoriteBorder } from "react-icons/md";
import "./Cards.css";
import { LensData } from "../../@types";
import { useNavigate } from "react-router-dom";
import { CiCircleMore } from "react-icons/ci";
import { toggleFavorite } from "../../features/cards/cardSlice";
import { useEffect, useRef } from "react";

interface CardProps {
  lens: LensData;
  token:string;
}

const Card: React.FC<CardProps> = ({ lens,token }) => {
  console.log(lens);
  
  const dispatch = useDispatch();
  const favorites = useSelector(
    (state: { card: { favorites?: string[] } }) => state.card.favorites||[]
  );
  const isFavorite = favorites.includes(lens._id);
  const headerRef = useRef<HTMLDivElement>(null);
  const nav = useNavigate();
  
  const handleFavoriteToggle = () => {
   dispatch(toggleFavorite(lens._id));
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
  console.log(isFavorite);

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
          {isFavorite ? <MdFavorite/> : <MdOutlineFavoriteBorder/>}
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
