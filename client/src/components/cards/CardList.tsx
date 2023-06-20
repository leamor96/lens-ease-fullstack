import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCards } from "../../features/cards/cardSlice";
import Card from "./Card";
import { AppDispatch, RootState } from "../../app/store";
import { LensData } from "../../@types";
import Modal from "react-modal";
import axios from "axios";
import AuthContext from "../../context/AuthContext";
import "./Cards.css";
import { useNavigate } from "react-router-dom";
import Search from "../utils/Search";
import { MdSearch } from "react-icons/md";


const CardList: React.FC = () => {   
  const dispatch = useDispatch<AppDispatch>();
  const cards = useSelector((state: RootState) => state.card.cards);
  const token = localStorage.getItem("token");
  const isAdmin = useContext(AuthContext);
  const [clickFavorite, setClickFavorite] = useState<boolean>(false);
  const [isOpen, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const navigate= useNavigate()

  const [newLens, setNewLens] = useState({
    name: "1.5 400UV",
    category: "stock",
    index: "1.5",
    diameter: "(+)65/(-)70",
    sphRange: {
      minus: [-6] as number[],
      plus: [6] as number[],
    },
    cylMax: "-2",
    coating: "none",
    price: "",
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
  }, [dispatch, clickFavorite]);


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
      navigate(-1);
    } catch (error) {
      console.error(error);
    }
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "sphRange.minus" || name === "sphRange.plus") {
      const axis = name.split(".")[1]; // Get the axis (minus or plus)
      setNewLens((prevLens) => ({
        ...prevLens,
        sphRange: {
          ...prevLens.sphRange,
          [axis]: [Number(value)],
        },
      }));
    } else {
      setNewLens((prevLens) => ({
        ...prevLens,
        [name]: value,
      }));
    }
  };
  const handleCoatingChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    setNewLens((prevLens) => ({
      ...prevLens,
      coating: value as "none" | "anti-reflective" | "scratch-resistant",
    }));
  };

  return (
    <div className="card-list-container">
      <MdSearch className="search-icon"/>
      <Search
        value={searchQuery}
        onChange={setSearchQuery}
        placeholder="Search by lens name"
      />
      {isAdmin && (
        <>
          <button className="btn btn-add-new btn-warning p-2" onClick={openModal}>
            Add New Lens
          </button>
          <Modal
            onRequestClose={closeModal}
            isOpen={isOpen}
            contentLabel="New Lens Modal"
            className="border-0 mt-5"
            style={{
              overlay: {
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              },
            }}
          >
            <div className="modal-content">
              <span className="close" onClick={closeModal}>
                &times;
              </span>
              <div className="card p-3">
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
                <br />
                <label>
                  Sph Range Minus:
                  <input
                    type="number"
                    name="sphRange.minus"
                    value={newLens.sphRange.minus.join(", ") || ""}
                    onChange={handleInputChange}
                  />
                </label>
                <br />
                <label>
                  Sph Range Plus:
                  <input
                    type="number"
                    name="sphRange.plus"
                    value={newLens.sphRange.plus.join(", ") || ""}
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
                    onChange={handleCoatingChange}
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
                    value={newLens.price}
                    onChange={handleInputChange}
                  />
                </label>
                <button className="btn btn-warning mt-2" onClick={handleSubmit}>
                  Save
                </button>
              </div>
            </div>
          </Modal>
        </>
      )}
      <div className="d-flex flex-wrap justify-content-center align-items-center mt-4 p-1">
        {cards
          .filter((card: LensData) =>
            card.name.toLowerCase().includes(searchQuery.toLowerCase())
          )
          .map((card: LensData) => (
            <Card
              key={card._id}
              lens={card}
              token={token || ""}
              clickFavorite={clickFavorite}
              setClickFavorite={setClickFavorite}
            />
          ))}
      </div>
    </div>
  );
};

export default CardList;
