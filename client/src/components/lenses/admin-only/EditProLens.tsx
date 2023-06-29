import { useState } from "react";
import { useDispatch } from "react-redux";
import { editProCard } from "../../../features/cards/proCardSlice";
import { ProLensData } from "../../../@types";
import { useLocation, useNavigate } from "react-router-dom";
import "./AdminOnly.css";
import axios from "../../../api/axios";

const EditProLens: React.FC = () => {
  const location = useLocation();
  const proLens = location?.state?.proLens;
  const token = localStorage.getItem("token");
  const [editedProLens, setEditedProLens] = useState<ProLensData>(proLens);
  const dispatch = useDispatch();
   const navigate = useNavigate();

  const handleInputChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;

    setEditedProLens((prevLens) => ({
      ...prevLens,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      await axios.put(
        `/pro-lenses/${editedProLens._id}`,
        editedProLens,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      dispatch(editProCard(editedProLens));
       navigate(-1);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="bg-dark p-5 d-flex justify-content-center">
      <div className="card-details card p-2">
        <label>
          Name:
          <input
            type="string"
            name="name"
            value={editedProLens.name}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Type:
          <input
            type="string"
            name="lensType"
            value={editedProLens.lensType}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Index:
          <input
            type="number"
            name="index"
            value={editedProLens.index}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Diameter:
          <input
            type="string"
            name="diameter"
            value={editedProLens.diameter}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Sph Range Minus:
          <input
            type="number"
            name="sphRange.minus"
            value={editedProLens.sphRange.minus?.join(",")}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Sph Range Plus:
          <input
            type="number"
            name="sphRange.plus"
            value={editedProLens.sphRange.plus?.join(",")}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Adjustment Height:
          <input
            type="string"
            name="adjustmentHeight"
            value={editedProLens.adjustmentHeight || ""}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Coating:
          <input
            type="string"
            name="coating"
            value={editedProLens.coating}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Price:
          <input
            type="number"
            name="price"
            value={editedProLens.price}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <button className="btn btn-warning" onClick={handleSubmit}>
          Save
        </button>
      </div>
    </div>
  );
};

export default EditProLens;
