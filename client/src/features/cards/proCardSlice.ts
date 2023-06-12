import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { ProLensData } from "../../@types";

interface ProCardState {
  cards: ProLensData[];
  favorites: string[]; // Array of card IDs that are marked as favorites
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null | undefined;
}

const initialState: ProCardState = {
  cards: [],
  favorites: [],
  status: "idle",
  error: null,
};

// Async thunk to fetch the card data from the server
export const fetchProCards = createAsyncThunk("proCard/fetchProCards", async () => {
  const response = await axios.get("http://localhost:3001/api/pro-lenses");
  return response.data;
});

const proCardSlice = createSlice({
  name: "proCard",
  initialState,
  reducers: {
    addCard(state, action: PayloadAction<ProLensData>) {
      state.cards.push(action.payload);
    },
    deleteCard(state, action: PayloadAction<string>) {
      state.cards = state.cards.filter((card) => card._id !== action.payload);
    },
    editCard(state, action: PayloadAction<ProLensData>) {
      const { _id } = action.payload;
      const index = state.cards.findIndex((card) => card._id === _id);
      if (index !== -1) {
        state.cards[index] = action.payload;
      }
    },
    toggleFavorite: (state, action: PayloadAction<string>) => {
      const proLensId = action.payload;
      const token = localStorage.getItem("token");
      console.log(token);

      const index = state.cards.findIndex((c) => c._id === proLensId);

      if (index !== -1) {
        const updatedCards = [...state.cards]; // Create a new array

        // Update the isFavorite field of the corresponding card in the new array
        updatedCards[index] = {
          ...updatedCards[index],
          isFavorite: !updatedCards[index].isFavorite,
        };

        const favoriteStatus = updatedCards[index].isFavorite;

        // Replace the cards array in the state with the updated array
        state.cards = updatedCards;
        // Send a request to the server to update the favorite status
        axios
          .post(`http://localhost:3001/api/pro-lenses/${proLensId}/favorite`, {
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
      .addCase(fetchProCards.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProCards.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.cards = action.payload;
      })
      .addCase(fetchProCards.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { addCard, deleteCard, editCard, toggleFavorite } =
  proCardSlice.actions;

export default proCardSlice.reducer;
