import { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { ProLensData } from "../../../@types";
import { RootState } from "../../../app/store";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../../context/AuthContext";
import "./ProCards.css";
import { BsPencil, BsTrash } from "react-icons/bs";
import Swal from "sweetalert2";
import { deleteProCard } from "../../../features/cards/proCardSlice";
import axios from "../../../api/axios";
import LoadingSpinner from "../../utils/LoadingSpinner";

interface CardDetailsParams extends Record<string, string | undefined> {
  id: string;
}

const ProCardDetails: React.FC = () => {
  const { id } = useParams<CardDetailsParams>();
  const proLens: ProLensData | undefined = useSelector((state: RootState) =>
    state.proCard.proCards.find((card) => card._id === id)
  );
  const dispatch = useDispatch();
  const { isAdmin } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {}, [id]);

  if (!proLens) {
    return <div className="bg-dark text-light p-5"><LoadingSpinner/></div>;
  }

  return (
    <div className="bg-dark p-4 d-flex justify-content-center">
      <div className="card-details card">
        <div className="card-header">
          <div className="header-field">{proLens.name}</div>
        </div>
        <div className="bg-warning text-center lens-category">
          {proLens.lensType}
        </div>
        <div className="card-body">
          <p>Index: {proLens.index}</p>
          <p>Diameter: {proLens.diameter}</p>
          <p>Minus Range: {proLens.sphRange.minus}</p>
          <p>Plus Range: {proLens.sphRange.plus}</p>
          <p>Adjustment Height: {proLens.adjustmentHeight}</p>
          <p>Coating: {proLens.coating}</p>
          <p>Price: ₪{proLens.price}</p>
          <button
            className="btn btn-dark"
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
                onClick={() => {
                  navigate(`/edit-pro/${proLens._id}`, { state: { proLens } });
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
                      axios
                        .delete(`/pro-lenses/${proLens._id}`)
                        .then((response) => {})
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

export default ProCardDetails;
