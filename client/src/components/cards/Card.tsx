import { useContext } from "react";
import { useDispatch } from "react-redux";
import { toggleFavorite, LensData } from "../../features/cards/cardSlice";
import AuthContext from "../../context/AuthContext";

interface CardProps {
  lens: LensData;
  isFavorite: boolean;
}

const Card: React.FC<CardProps> = ({ lens, isFavorite }) => {
  const dispatch = useDispatch();
  const { isLoggedIn } = useContext(AuthContext);

  const handleFavoriteToggle = () => {
    dispatch(toggleFavorite(lens._id));
  };

  return (
    <div className="card">
      <div className="card-header">
        <h2>{lens.name}</h2>
        {!isLoggedIn && (
          <button
            onClick={handleFavoriteToggle}
            className={`favorite-button ${isFavorite ? "active" : ""}`}
          >
            {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
          </button>
        )}
      </div>
      <div className="card-body">
        <p>Index: {lens.index}</p>
        <p>Diameter: {lens.diameter}</p>
        <p>Minus Range: {lens.minusRange}</p>
        <p>Plus Range: {lens.plusRange}</p>
        <p>Coating: {lens.coating}</p>
        <p>Price: ₪{lens.price}</p>
      </div>
    </div>
  );
};

export default Card;
