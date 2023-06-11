import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { toggleFavorite, LensData } from "../../features/cards/cardSlice";
import { MdFavorite, MdOutlineFavoriteBorder } from "react-icons/md";
import "./Cards.css";

interface CardProps {
  lens: LensData;
  isFavorite: boolean;
  token:string;
}

const Card: React.FC<CardProps> = ({ lens, isFavorite,token }) => {
  const dispatch = useDispatch();
 
  const headerRef = useRef<HTMLDivElement>(null);

  const handleFavoriteToggle = () => {
   dispatch(toggleFavorite({ lensId: lens._id, token }));
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
    <div className="card card-size m-2">
      <div className="card-header">
        <div className="header-field" ref={headerRef}>
          {lens.name}
        </div>
      </div>
      <div className="bg-warning text-center lens-category"> {lens.category}</div>
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
            <FavoriteIcon />
          </button>
    
      </div>
    </div>
  );
};

export default Card;
