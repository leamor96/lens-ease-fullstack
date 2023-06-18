import { useContext, useEffect,useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCards } from "../../features/cards/cardSlice";
import Card from "./Card";
import { AppDispatch, RootState } from "../../app/store";
import { LensData } from "../../@types";
import Modal from "react-modal";
import axios from "axios";
import AuthContext from "../../context/AuthContext";


const CardList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const cards = useSelector((state: RootState) => state.card.cards);
  const token = localStorage.getItem("token");
  const isAdmin = useContext(AuthContext);

  const [isOpen, setOpen] = useState(false);
  const [newLens, setNewLens] = useState({
    name: "",
    category: "",
    index: "",
    diameter:"",
    //more properties

  });
    Modal.setAppElement("#root");
    const closeModal = () => {
      setOpen(false);
    };


  const openModal = () => {
    setOpen(true);
  };
 

  useEffect(() => {
    dispatch(fetchCards());
  }, [dispatch]);

  const handleSubmit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    try {
      // Make a POST request to create the new lens
      await axios.post("http://localhost:3001/api/lenses", newLens, {
        headers: {
          Authorization: `${token}`,
        },
      });
      // Close the modal and update the list of lenses
      openModal();
      dispatch(fetchCards());
    } catch (error) {
      console.error(error);
    }
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewLens((prevLens) => ({
      ...prevLens,
      [name]: value,
    }));
  };

  return (
    <div className="card-list-container">
      {isAdmin && (
        <>
  {/*         <button className="btn btn-warning m-3" onClick={openModal}>
            Create New Lens
          </button> */}

          <Modal
            onRequestClose={closeModal}
            isOpen={isOpen}
            className="border-0 mt-5"
            style={{
              overlay: {
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              },
            }}
          >
            <div className="modal">
              <div className="modal-content">
                <span className="close" onClick={closeModal}>
                  &times;
                </span>
                <div className="card-details card p-2">
                  <label>
                    Name:
                    <input
                      type="string"
                      name="name"
                      value={newLens.name}
                      onChange={handleInputChange}
                    />
                  </label>
                  <br />
                  <label>
                    Category:
                    <input
                      type="string"
                      name="category"
                      value={newLens.category}
                      onChange={handleInputChange}
                    />
                  </label>
                  <br />
                  <label>
                    Index:
                    <input
                      type="number"
                      name="index"
                      value={newLens.index}
                      onChange={handleInputChange}
                    />
                  </label>
                  <br />
                  <label>
                    Diameter:
                    <input
                      type="string"
                      name="diameter"
                      value={newLens.diameter}
                      onChange={handleInputChange}
                    />
                  </label>
          {/*         <br />
                  <label>
                    Sph Range Minus:
                    <input
                      type="number"
                      name="sphRange.minus"
                      value={newLens.sphRange.minus?.join(",")}
                      onChange={handleInputChange}
                    />
                  </label>
                  <br />
                  <label>
                    Sph Range Plus:
                    <input
                      type="number"
                      name="sphRange.plus"
                      value={newLens.sphRange.plus?.join(",")}
                      onChange={handleInputChange}
                    />
                  </label>
                  <br />
                  <label>
                    Cyl Max:
                    <input
                      type="number"
                      name="cylMax"
                      value={newLens.cylMax || ""}
                      onChange={handleInputChange}
                    />
                  </label>
                  <br />
                  <label>
                    Coating:
                    <select
                      name="coating"
                      value={newLens.coating}
                      onChange={handleInputChange}
                    >
                      <option value="none">None</option>
                      <option value="anti-reflective">Anti-reflective</option>
                      <option value="scratch-resistant">
                        Scratch-resistant
                      </option>
                    </select>
                  </label>
                  <br />
                  <label>
                    Price:
                    <input
                      type="number"
                      name="price"
                      value={newLens.price}
                      onChange={handleInputChange}
                    />
                  </label> */}
                  <br />
                  <button className="btn btn-warning" onClick={handleSubmit}>
                    Save
                  </button>
                </div>
              </div>
            </div>
          </Modal>
        </>
      )}
      <div className="d-flex flex-wrap justify-content-center align-items-center">
        {cards.map((card: LensData) => (
          <Card key={card._id} lens={card} token={token || ""} />
        ))}
      </div>
    </div>
  );
};

export default CardList;
