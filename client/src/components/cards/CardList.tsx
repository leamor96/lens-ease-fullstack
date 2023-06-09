import { Dispatch, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCards,
  LensData,
} from "../../features/cards/cardSlice";
import Card from "./Card";
import { RootState } from "../../app/store";

const CardList: React.FC = () => {
  const dispatch:Dispatch<any> = useDispatch();
  const cards = useSelector((state: RootState) => state.card.cards);

  useEffect(() => {
    dispatch(fetchCards());
  }, [dispatch]);

  return (
    <div>
      {cards.map((card: LensData) => (
        <Card key={card._id} lens={card} isFavorite={card.isFavorite} />
      ))}
    </div>
  );
};

export default CardList;
