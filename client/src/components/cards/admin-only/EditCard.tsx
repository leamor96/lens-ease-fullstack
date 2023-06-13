import React from 'react'

const EditCard = () => {
  return (
    <div>EditCard</div>
  )
}

export default EditCard



/* import { useContext, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editCard, toggleFavorite } from "../../../features/cards/cardSlice";
import { MdFavorite, MdOutlineFavoriteBorder } from "react-icons/md";
import "./Cards.css";
import { LensData } from "../../../@types";
import { AuthContext } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { BsPencil, BsTrash } from "react-icons/bs";

interface EditCardProps {
  lens: LensData;
  token: string;
}

const EditCard: React.FC<EditCardProps> = ({ lens, token }) => {
  const dispatch = useDispatch();
  const favorites = useSelector(
    (state: { card: { favorites: string[] } }) => state.card.favorites
  );
  const isFavorite = favorites.includes(lens._id);
  const headerRef = useRef<HTMLDivElement>(null);
  const { isAdmin } = useContext(AuthContext);
  const nav = useNavigate();

  const [editedLens, setEditedLens] = useState<LensData>(lens);

  const handleFavoriteToggle = () => {
    // Toggle the favorite status
    dispatch(toggleFavorite(lens._id));
  };

  const handleEditLens = () => {
    // Dispatch the edited lens to update the card in the Redux store
    dispatch(editCard(editedLens));

    // Show a success message
    Swal.fire({
      title: "Card Updated!",
      icon: "success",
      confirmButtonColor: "#ffc107",
    });
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
          <input
            type="text"
            className="form-control"
            value={editedLens.name}
            onChange={(e) =>
              setEditedLens({ ...editedLens, name: e.target.value })
            }
          />
        </div>
      </div>
      <div className="bg-warning text-center lens-category">
        <input
          type="text"
          className="form-control"
          value={editedLens.category}
          onChange={(e) =>
            setEditedLens({ ...editedLens, category: e.target.value })
          }
        />
      </div>
      <div className="card-body">
        <p className="card-field">
          Index:{" "}
          <input
            type="text"
            className="form-control"
            value={editedLens.index}
            onChange={(e) =>
              setEditedLens({ ...editedLens, index: e.target.value })
            }
          />
        </p>
        <p className="card-field">
          Diameter:{" "}
          <input
            type="text"
            className="form-control"
            value={editedLens.diameter}
            onChange={(e) =>
              setEditedLens({ ...editedLens, diameter: e.target.value })
            }
          />
        </p>
        <p className="card-field">
          Minus Range:{" "}
          <input
            type="text"
            className="form-control"
            value={editedLens.sphRange.minus}
            onChange={(e) =>
              setEditedLens({
                ...editedLens,
                sphRange: {
                  ...editedLens.sphRange,
                  minus: e.target.value,
                },
              })
            }
          />
        </p>
        <p className="card-field">
          Plus Range:{" "}
          <input
            type="text"
            className="form-control"
            value={editedLens.sphRange.plus}
            onChange={(e) =>
              setEditedLens({
                ...editedLens,
                sphRange: {
                  ...editedLens.sphRange,
                  plus: e.target.value,
                },
              })
            }
          />
        </p>
        <p className="card-field">
          Coating:{" "}
          <input
            type="text"
            className="form-control"
            value={editedLens.coating}
            onChange={(e) =>
              setEditedLens({ ...editedLens, coating: e.target.value })
            }
          />
        </p>
        <p className="card-field lens-price">
          Price: ₪
          <input
            type="text"
            className="form-control"
            value={editedLens.price}
            onChange={(e) =>
              setEditedLens({ ...editedLens, price: e.target.value })
            }
          />
        </p>

        <button
          className="border-0 bg-transparent favorite-icon"
          onClick={handleFavoriteToggle}
        >
          <FavoriteIcon />
        </button>

        {isAdmin && (
          <div className="delete-edit-buttons">
            <button
              className="btn admin-btn btn-secondary mt-0"
              onClick={handleEditLens}
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
                    // Dispatch the delete action here
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

export default EditCard; */
