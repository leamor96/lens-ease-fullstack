import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { LensData } from "../../@types";

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

// Async thunk to fetch the card data from the server
export const fetchCards = createAsyncThunk("card/fetchCards", async () => {
  const response = await axios.get<LensData[]>(
    "http://localhost:3001/api/lenses"
  );
  return response.data;
});

const cardSlice = createSlice({
  name: "card",
  initialState,
  reducers: {
    addCard(state, action: PayloadAction<LensData>) {
      state.cards.push(action.payload);
      //להוסיף אקסיוס לשרת
    },
    deleteCard(state, action: PayloadAction<string>) {
      state.cards = state.cards.filter((card) => card._id !== action.payload);
      //להוסיף אקסיוס לשרת
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
          .post(
            `http://localhost:3001/api/lenses/${userId}/favorite/${lensId}`,
            {},
            {
              headers: {
                Authorization: `${token}`,
              },
            }
          )
          .then((response) => {
            // Handle the response if needed
          })
          .catch((error) => {
            // Handle any errors
            alert(error.response?.data);
            console.error("Failed to update favorite status", error);
            // Reset the local favorite status to its previous value
            state.cards[index].isFavorite = !favoriteStatus;
          });
      }
    },
    toggleUnFavorite: (state, action: PayloadAction<LensData>): void => {
      const lens=action.payload;
      const lensId = lens._id;
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");
      
      const index = state.cards.findIndex((c) => c._id === lensId);

      if (index !== -1) {
        const updatedCard = [...state.cards]; // Create a new array

        // Update the isFavorite field of the corresponding card in the new array
        updatedCard[index] = {
          ...updatedCard[index],
          isFavorite: !updatedCard[index].isFavorite,
        };

        const favoriteStatus = updatedCard[index].isFavorite;

        // Replace the cards array in the state with the updated array
        state.cards = updatedCard;

        // Send a request to the server to update the favorite status
        axios
          .delete(
            `http://localhost:3001/api/lenses/${userId}/delete-from-favorite/${lensId}`,
            {
              headers: {
                Authorization: `${token}`,
              },
            }
          )
          .then((response) => {
            // Handle the response if needed
          })
          .catch((error) => {
            // Handle any errors
            alert(error.response?.data)
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


export const { addCard, deleteCard, editCard, toggleFavorite, toggleUnFavorite } =
  cardSlice.actions;

export default cardSlice.reducer;
