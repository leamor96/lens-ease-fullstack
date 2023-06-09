import { useContext } from "react";
import { useDispatch } from "react-redux";
import { toggleFavorite, LensData } from "../../features/cards/cardSlice";
import AuthContext from "../../context/AuthContext";
import { MdFavorite, MdOutlineFavoriteBorder } from "react-icons/md";

interface CardProps {
  lens: LensData;
  isFavorite: boolean;
}

const Card: React.FC<CardProps> = ({ lens, isFavorite }) => {
  const dispatch = useDispatch();
  const {isLoggedIn } = useContext(AuthContext);

  const handleFavoriteToggle = () => {
    if (isLoggedIn){
       dispatch(toggleFavorite(lens._id));
    }
  };
 const FavoriteIcon = isFavorite ? MdFavorite : MdOutlineFavoriteBorder;
  return (
    <div className="card">
      {isLoggedIn && (
        <button className="border-0 bg-transparent favorite-icon" onClick={handleFavoriteToggle}>
          <FavoriteIcon />
        </button>
      )}
      <div className="card-header">
        <h2>{lens.name}</h2>
      </div>
      <div className="card-body">
        <p>{lens.name}</p>
        <p>Index: {lens.index}</p>
        <p>Diameter: {lens.diameter}</p>
        <p>Minus Range: {lens.sphRange.minus}</p>
        <p>Plus Range: {lens.sphRange.plus}</p>
        <p>Coating: {lens.coating}</p>
        <p>Price: ₪{lens.price}</p>
      </div>
    </div>
  );
};

export default Card;
