import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { LensData } from "../../@types";
import FavAlert from "../../components/utils/FavAlert";
import axios from "../../api/axios";

interface CardState {
  cards: LensData[];
  favorites: string[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null | undefined;
}

const initialState: CardState = {
  cards: [],
  favorites: [],
  status: "idle",
  error: null,
};

export const fetchCards = createAsyncThunk("card/fetchCards", async () => {
  const response = await axios.get<LensData[]>("/lenses");
  return response.data;
});

const cardSlice = createSlice({
  name: "card",
  initialState,
  reducers: {
    addCard(state, action: PayloadAction<LensData>) {
      state.cards.push(action.payload);
    },
    deleteCard(state, action: PayloadAction<string>) {
      state.cards = state.cards.filter((card) => card._id !== action.payload);
    },
    editCard(state, action: PayloadAction<LensData>) {
      const { _id } = action.payload;
      const index = state.cards.findIndex((card) => card._id === _id);
      if (index !== -1) {
        state.cards[index] = action.payload;
      }
    },
    toggleFavorite: (state, action: PayloadAction<LensData>): void => {
      const lens=action.payload;
      const lensId = lens._id;
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");
      
      const index = state.cards.findIndex((c) => c._id === lensId);

      if (index !== -1) {
        const updatedCards = [...state.cards]; 
        updatedCards[index] = {
          ...updatedCards[index],
          isFavorite: !updatedCards[index].isFavorite,
        };

        const favoriteStatus = updatedCards[index].isFavorite;
        state.cards = updatedCards;
        axios
          .post(
            `/lenses/${userId}/favorite/${lensId}`,
            {},
            {
              headers: {
                Authorization: `${token}`,
              },
            }
          )
          .then((response) => {
          })
          .catch((error) => {
             FavAlert({ title: error.response?.data });
            console.error("Failed to update favorite status", error);
            state.cards[index].isFavorite = !favoriteStatus;
          });
      }
    },
    toggleUnFavorite: (state, action: PayloadAction<LensData>): void => {
      const lens=action.payload;
      const lensId = lens._id;
      const userId = localStorage.getItem("userId");
      
      const index = state.cards.findIndex((c) => c._id === lensId);

      if (index !== -1) {
        const updatedCard = [...state.cards]; 
        updatedCard[index] = {
          ...updatedCard[index],
          isFavorite: !updatedCard[index].isFavorite,
        };

        const favoriteStatus = updatedCard[index].isFavorite;

        state.cards = updatedCard;

        axios
          .delete(
            `/lenses/${userId}/delete-from-favorite/${lensId}`)
          .then((response) => {
          })
          .catch((error) => {
            FavAlert({title:error.response?.data})
            console.error("Failed to update favorite status", error);
            state.cards[index].isFavorite = !favoriteStatus;
          });
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCards.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCards.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.cards = action.payload;
      })
      .addCase(fetchCards.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
}); 


export const { addCard, deleteCard, editCard, toggleFavorite, toggleUnFavorite } =
  cardSlice.actions;

export default cardSlice.reducer;
