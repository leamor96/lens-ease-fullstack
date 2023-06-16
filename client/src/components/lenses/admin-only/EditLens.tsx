import { useState } from "react";
import { useDispatch } from "react-redux";
import { editCard } from "../../../features/cards/cardSlice";
import { LensData } from "../../../@types";
import { useLocation } from "react-router-dom";
import axios from "axios";

const EditLens: React.FC = () => {
  const location = useLocation();
  console.log("location"+location);
  
  const lens = location.state as LensData;
  console.log("lens"+lens);
  
  const [editedLens, setEditedLens] = useState<LensData>(lens);

  const dispatch = useDispatch();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setEditedLens((prevLens) => ({
      ...prevLens,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      // Make a PUT request to update the lens on the server
      await axios.put(
        `http://localhost:3001/api/lenses/${editedLens._id}`,
        editedLens
      );

      // Dispatch the editCard action to update the lens in the Redux store
      dispatch(editCard(editedLens));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
     {/*  <label>
        Name:
        <input
          type="text"
          name="name"
          value={editedLens.name}
          onChange={handleInputChange}
        />
      </label>
      <br />
      <label>
        Category:
        <input
          type="text"
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
      <br /> */}
      {/* Add input fields for other properties of the lens object */}
      <button className="btn btn-warning" onClick={handleSubmit}>
        Save
      </button>
    </div>
  );
};

export default EditLens;
