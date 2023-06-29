import { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { LensData } from "../../@types";
import { RootState } from "../../app/store";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import "./Cards.css";
import { BsPencil, BsTrash } from "react-icons/bs";
import Swal from "sweetalert2";
import { deleteCard } from "../../features/cards/cardSlice";
import LoadingSpinner from "../utils/LoadingSpinner";
import axios from "../../api/axios";

interface CardDetailsParams extends Record<string, string | undefined> {
  id: string;
}

const CardDetails: React.FC = () => {
  const { id } = useParams<CardDetailsParams>();
  const lens: LensData | undefined = useSelector((state: RootState) =>
    state.card.cards.find((card) => card._id === id)
  );
  const dispatch = useDispatch();
  const {isAdmin} = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
  }, [id]);

  if (!lens) {
    return <div className="bg-dark text-light p-5"><LoadingSpinner/></div>;
  }
  return (
    <div className="bg-dark p-4 d-flex justify-content-center">
      <div className="card-details card">
        <div className="card-header">
          <div className="header-field">{lens.name}</div>
        </div>
        <div className="bg-warning text-center lens-category">
          {" "}
          {lens.category}
        </div>
        <div className="card-body">
          <p>Index: {lens.index}</p>
          <p>Diameter: {lens.diameter}</p>
          <p>Minus Range: {lens.sphRange.minus}</p>
          <p>Plus Range: {lens.sphRange.plus}</p>
          <p>Cyl Range: {lens.cylMax}</p>
          <p>Coating: {lens.coating}</p>
          <p>Price: ₪{lens.price}</p>
          <button
            className="btn btn-back btn-dark"
            onClick={() => {
              navigate(-1);
            }}
          >
            Back
          </button>
          {isAdmin && ( 
            <div className="delete-edit-buttons">
              <button
                className="btn admin-btn btn-secondary mt-0"
                onClick={() =>
                  navigate(`/edit/${lens._id}`, { state: { lens } })
                }
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
                    denyButtonText: "No",
                    confirmButtonColor: "#ffc107",
                    denyButtonColor: "black",
                    showCancelButton: false,
                  }).then((result) => {
                    if (result.isConfirmed) {
                      dispatch(deleteCard(lens._id));
                      axios
                        .delete(
                          `/lenses/${lens._id}`
                        )
                        .then((response) => {
                        })
                        .catch((error) => {
                          console.error("Failed to delete the lens", error);
                        });
                      navigate(-1);
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
    </div>
  );
};

export default CardDetails;
