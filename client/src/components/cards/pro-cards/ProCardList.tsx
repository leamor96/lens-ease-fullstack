import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProCards } from "../../../features/cards/proCardSlice";
import ProCard from "./ProCard";
import { AppDispatch, RootState } from "../../../app/store";
import { ProLensData } from "../../../@types";

const ProCardList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const cards = useSelector((state: RootState) => state.proCard.cards);
  const token = localStorage.getItem("token");

  useEffect(() => {
    dispatch(fetchProCards());
  }, [dispatch]);

  return (
    <div className="card-list-container d-flex flex-wrap justify-content-center align-items-center p-3">
      {cards.map((card: ProLensData) => (
        <ProCard key={card._id} proLens={card} token={token || ""} />
      ))}
    </div>
  );
};

export default ProCardList;
