import { useContext, useEffect, useRef } from "react";
import { useDispatch ,useSelector} from "react-redux";
import { deleteCard } from "../../features/cards/cardSlice";
import { MdFavorite, MdOutlineFavoriteBorder } from "react-icons/md";
import "./Cards.css";
import { LensData } from "../../@types";
import {AuthContext} from "../../context/AuthContext"
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { BsPencil, BsTrash } from "react-icons/bs";
import { toggleFavorite } from "../../features/favoriteProSlice";

interface CardProps {
  lens: LensData;
  token:string;
}

const Card: React.FC<CardProps> = ({ lens,token }) => {
  const dispatch = useDispatch();
  const favorites = useSelector(
    (state: { card: { favorites?: string[] } }) => state.card.favorites||[]
  );
  const isFavorite = favorites.includes(lens._id);
  const headerRef = useRef<HTMLDivElement>(null);
  const { isAdmin } = useContext(AuthContext);
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

  const FavoriteIcon = isFavorite ? MdFavorite : MdOutlineFavoriteBorder;

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
          <FavoriteIcon />
        </button>
     {/* isAdmin && */ ( // Conditionally render the add/edit/delete buttons for admin */}
        <div className="delete-edit-buttons">
          <button
            className="btn admin-btn btn-secondary mt-0"
            onClick={() => {
              nav(`/edit/${lens._id}`);
            }}
          >
            <BsPencil />
          </button>
          <button
            className="btn admin-btn btn-dark mt-0"
            onClick={() => {
              Swal.fire({
                title: "Are you sure you want to delete this?",
                showDenyButton: true,
                confirmButtonText: "Yes",
                denyButtonText: `No`,
                confirmButtonColor: "#ffc107",
                denyButtonColor: "black",
                showCancelButton: false,
              }).then((result) => {
                if (result.isConfirmed) {
                  dispatch(deleteCard(lens._id));
                  Swal.fire({
                    title: "Deleted!",
                    icon: "success",
                    confirmButtonColor: "#ffc107",
                  });
                } else if (result.isDenied) {
                  Swal.fire({
                    title: "lens not deleted",
                    icon: "info",
                    iconColor: "#343a40",
                    confirmButtonColor: "#ffc107",
                  });
                }
              });
            }}
          >
            <BsTrash />
          </button>
        </div>
         )} 
      </div>
    </div>
  );
};

export default Card;
