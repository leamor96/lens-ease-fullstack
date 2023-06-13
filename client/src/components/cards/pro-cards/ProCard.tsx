import { useContext, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleFavorite } from "../../../features/favoriteProSlice";
import { MdFavorite, MdOutlineFavoriteBorder } from "react-icons/md";
import { ProLensData } from "../../../@types";
import "./ProCards.css";
import AuthContext from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { BsPencil, BsTrash } from "react-icons/bs";
import Swal from "sweetalert2";
import { deleteProCard } from "../../../features/cards/proCardSlice";

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
  const { isAdmin } = useContext(AuthContext);
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
        {
          /* isAdmin && */ // Conditionally render the add/edit/delete buttons for admin */}
          <div className="delete-edit-buttons">
            <button
              className="btn admin-btn btn-secondary mt-0"
              onClick={() => {
                nav(`/edit/${proLens._id}`);
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
                    dispatch(deleteProCard(proLens._id));
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
        }
      </div>
    </div>
  );
};

export default ProCard;
