import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProCards } from "../../../features/cards/proCardSlice";
import ProCard from "./ProCard";
import { AppDispatch, RootState } from "../../../app/store";
import { ProLensData } from "../../../@types";
import AuthContext from "../../../context/AuthContext";
import Modal from "react-modal";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Search from "../../utils/Search";
import { MdSearch } from "react-icons/md";

const ProCardList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const proCards = useSelector((state: RootState) => state.proCard.proCards);
  const token = localStorage.getItem("token");
  const isAdmin = useContext(AuthContext);
  const [clickFavorite, setClickFavorite] = useState<boolean>(false);
  const [isOpen, setOpen] = useState(false);
   const [searchQuery, setSearchQuery] = useState<string>("");
  const navigate = useNavigate();

  const [newProLens, setNewProLens] = useState({
    name: "FIT",
    lensType: "DSP Technology",
    index: "1.5",
    diameter: "90",
    sphRange: {
      minus: [-6] as number[],
      plus: [6] as number[],
    },
    adjustmentHeight: "",
    coating: "A.R",
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
    dispatch(fetchProCards());
  }, [dispatch, clickFavorite]);

  const handleSubmit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    try {
      // Make a POST request to create the new lens
      await axios.post("http://localhost:3001/api/pro-lenses", newProLens, {
        headers: {
          Authorization: `${token}`,
        },
      });
      // Close the modal and update the list of lenses
      openModal();
      dispatch(fetchProCards());
      navigate(-1);
    } catch (error) {
      console.error(error);
    }
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "sphRange.minus" || name === "sphRange.plus") {
      const axis = name.split(".")[1]; // Get the axis (minus or plus)
      setNewProLens((prevLens) => ({
        ...prevLens,
        sphRange: {
          ...prevLens.sphRange,
          [axis]: [Number(value)],
        },
      }));
    } else {
      setNewProLens((prevLens) => ({
        ...prevLens,
        [name]: value,
      }));
    }
  };

  return (
    <div className="card-list-container">
      <MdSearch className="search-icon" />
      <Search
        value={searchQuery}
        onChange={setSearchQuery}
        placeholder="Search by lens name"
      />
      {isAdmin && (
        <>
          <button className="btn btn-add-new btn-warning" onClick={openModal}>
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
                    value={newProLens.name}
                    onChange={handleInputChange}
                  />
                </label>
                <br />
                <label>
                  Lens Type:
                  <input
                    type="string"
                    name="lensType"
                    value={newProLens.lensType}
                    onChange={handleInputChange}
                  />
                </label>
                <br />
                <label>
                  Index:
                  <input
                    type="number"
                    name="index"
                    value={newProLens.index}
                    onChange={handleInputChange}
                  />
                </label>
                <br />
                <label>
                  Diameter:
                  <input
                    type="string"
                    name="diameter"
                    value={newProLens.diameter}
                    onChange={handleInputChange}
                  />
                </label>
                <br />
                <label>
                  Sph Range Minus:
                  <input
                    type="number"
                    name="sphRange.minus"
                    value={newProLens.sphRange.minus.join(", ") || ""}
                    onChange={handleInputChange}
                  />
                </label>
                <br />
                <label>
                  Sph Range Plus:
                  <input
                    type="number"
                    name="sphRange.plus"
                    value={newProLens.sphRange.plus.join(", ") || ""}
                    onChange={handleInputChange}
                  />
                </label>
                <br />
                <label>
                  Adjustment Height:
                  <input
                    type="string"
                    name="adjustmentHeight"
                    value={newProLens.adjustmentHeight}
                    onChange={handleInputChange}
                  />
                </label>
                <br />
                <label>
                  Coating:
                  <input
                    type="string"
                    name="coating"
                    value={newProLens.coating}
                    onChange={handleInputChange}
                  />
                </label>
                <br />
                <label>
                  Price:
                  <input
                    type="number"
                    name="price"
                    value={newProLens.price}
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
        {proCards
          .filter((proCard: ProLensData) =>
            proCard.name.toLowerCase().includes(searchQuery.toLowerCase())
          )
          .map((proCard: ProLensData) => (
            <ProCard
              key={proCard._id}
              proLens={proCard}
              token={token || ""}
              clickFavorite={clickFavorite}
              setClickFavorite={setClickFavorite}
            />
          ))}
      </div>
    </div>
  );
};

export default ProCardList;
