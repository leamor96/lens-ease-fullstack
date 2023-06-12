import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCards } from "../../features/cards/cardSlice";
import Card from "./Card";
import { AppDispatch, RootState } from "../../app/store";
import { LensData } from "../../@types";


const CardList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const cards = useSelector((state: RootState) => state.card.cards);
  const token = localStorage.getItem("token");

  useEffect(() => {
    dispatch(fetchCards());
  }, [dispatch]);

  return (
    <div className="card-list-container d-flex flex-wrap justify-content-center align-items-center p-3">
      {cards.map((card: LensData) => (
        <Card key={card._id} lens={card} token={token||""}/>
      ))}
    </div>
  );
};

export default CardList;
