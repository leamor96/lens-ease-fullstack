import { useState } from "react";
import { useDispatch } from "react-redux";
import { editCard } from "../../../features/cards/cardSlice";
import { LensData } from "../../../@types";
import { useLocation } from "react-router-dom";
import axios from "axios";
import "./AdminOnly.css";

const EditLens: React.FC = () => {
  const location = useLocation();
  const lens = location?.state?.lens;
  const token = localStorage.getItem("token");
  const [editedLens, setEditedLens] = useState<LensData>(lens);
  const dispatch = useDispatch();

  const handleInputChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setEditedLens((prevLens) => ({
      ...prevLens,
      [name]: name === "cylMax" ? +value : value,
    }));
  };

  const handleSubmit = async () => {
    try {
      // Make a PUT request to update the lens on the server
      await axios.put(
        `http://localhost:3001/api/lenses/${editedLens._id}`,
        editedLens,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );

      // Dispatch the editCard action to update the lens in the Redux store
      dispatch(editCard(editedLens));
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
            value={editedLens.name}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Category:
          <input
            type="string"
            name="category"
            value={editedLens.category}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Index:
          <input
            type="number"
            name="index"
            value={editedLens.index}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Diameter:
          <input
            type="string"
            name="diameter"
            value={editedLens.diameter}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Sph Range Minus:
          <input
            type="number"
            name="sphRange.minus"
            value={editedLens.sphRange.minus?.join(",")}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Sph Range Plus:
          <input
            type="number"
            name="sphRange.plus"
            value={editedLens.sphRange.plus?.join(",")}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Cyl Max:
          <input
            type="number"
            name="cylMax"
            value={editedLens.cylMax || ""}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Coating:
          <select
            name="coating"
            value={editedLens.coating}
            onChange={handleInputChange}
          >
            <option value="none">None</option>
            <option value="anti-reflective">Anti-reflective</option>
            <option value="scratch-resistant">Scratch-resistant</option>
          </select>
        </label>
        <br />
        <label>
          Price:
          <input
            type="number"
            name="price"
            value={editedLens.price}
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

export default EditLens;
