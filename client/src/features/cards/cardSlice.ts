import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import axios from "axios";

export interface LensData {
  _id: string;
  name: string;
  category: string;
  index: number;
  diameter: string;
  sphRange: {
    minus: number[] | null;
    plus: number[] | null;
  };
  cylMax: number | null;
  coating: "none" | "anti-reflective" | "scratch-resistant";
  price: number;
  isFavorite:boolean
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
  const response = await axios.get("http://localhost:3001/api/lenses");
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
    toggleFavorite: (
      state,
      action: PayloadAction<{ lensId: string; token: string }>
    ) => {
      const {lensId,token} = action.payload;
      const index = state.cards.findIndex((c) => c._id === lensId);

      if (index !== -1) {
        // Update the isFavorite field locally
        state.cards[index].isFavorite = !state.cards[index].isFavorite;
        const favoriteStatus = state.cards[index].isFavorite;

        // Send a request to the server to update the favorite status
        axios
          .post(`http://localhost:3001/api/lenses/${lensId}/favorite`, null, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((response) => {
            // Handle the response if needed
          })
          .catch((error) => {
            // Handle any errors
            console.error("Failed to update favorite status", error);
            // Reset the local favorite status to its previous value
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

export const { addCard, deleteCard, editCard, toggleFavorite } =
  cardSlice.actions;

export default cardSlice.reducer;
