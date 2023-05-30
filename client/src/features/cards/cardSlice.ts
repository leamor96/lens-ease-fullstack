import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export interface LensData {
  _id: string;
  name: string;
  index: string;
  diameter: string;
  minusRange: string;
  plusRange: string;
  coating: string;
  price: number;
}

interface CardState {
  cards: LensData[];
  favorites: string[]; // Array of card IDs that are marked as favorites
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null | undefined;
}

const initialState: CardState = {
  cards: [],
  favorites: [],
  status: "idle",
  error: null,
};

// Async thunk to fetch the card data from the server
export const fetchCards = createAsyncThunk("card/fetchCards", async () => {
  const response = await axios.get("/api/lenses");
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
    toggleFavorite(state, action: PayloadAction<string>) {
      const cardId = action.payload;
      const isFavorite = state.favorites.includes(cardId);

      if (isFavorite) {
        state.favorites = state.favorites.filter((id) => id !== cardId);
      } else {
        state.favorites.push(cardId);
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

export const { addCard, deleteCard, editCard, toggleFavorite } =
  cardSlice.actions;

export default cardSlice.reducer;
