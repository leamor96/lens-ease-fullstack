import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleFavorite } from "../../../features/cards/proCardSlice";
import { MdFavorite, MdOutlineFavoriteBorder } from "react-icons/md";
import { ProLensData } from "../../../@types";
import "./ProCards.css";
import { useNavigate } from "react-router-dom";
import { CiCircleMore } from "react-icons/ci";

interface CardProps {
  proLens: ProLensData;
  token: string;
}

const ProCard: React.FC<CardProps> = ({ proLens, token }) => {
  const dispatch = useDispatch();
  const favoritesPro = useSelector(
    (state: { proCard: { favoritesPro?: string[] } }) =>
      state.proCard.favoritesPro ||[]
  );
  const isFavorite = favoritesPro.includes(proLens._id);

  const headerRef = useRef<HTMLDivElement>(null);
  const nav = useNavigate();

  const handleFavoriteToggle = () => {
    dispatch(toggleFavorite(proLens._id));
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

  const FavoriteIcon = isFavorite ? MdFavorite : MdOutlineFavoriteBorder;
  return (
    <div className="card pro-card-size m-2">
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
        <p className="card-field">
          Adjustment Height:{proLens.adjustmentHeight}
        </p>
        <p className="card-field">Coating: {proLens.coating}</p>
        <p className="card-field lens-price">Price: ₪{proLens.price}</p>

        <button
          className="border-0 bg-transparent favorite-icon"
          onClick={handleFavoriteToggle}
        >
          <FavoriteIcon />
        </button>
        <button
          className="border-0 bg-transparent text-light more-icon"
          onClick={() => {
            nav(`/pro-cards/details/${proLens._id}`);
          }}
        >
          <CiCircleMore />
        </button>
      </div>
    </div>
  );
};

export default ProCard;