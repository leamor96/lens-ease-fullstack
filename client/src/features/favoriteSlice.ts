import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { LensData } from "../@types";
import { RootState } from "../app/store";

interface FavoritesState {
  favorites: LensData[]; // Array of card IDs that are marked as favorites
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null | undefined;
}

const initialState: FavoritesState = {
  favorites: [],
  status: "idle",
  error: null,
};

// Async thunk to fetch the favorite lenses data from the server
export const fetchFavoriteLenses = createAsyncThunk(
  "card/fetchFavoriteLenses",
  async () => {
    const token = localStorage.getItem("token");
    const response = await axios.get<LensData[]>(
      `http://localhost:3001/api/lenses/favorites/:id`,
      {
        headers: {
          Authorization: `${token}`,
        },
      }
    ); 
    return response.data;
  }
);

const favoriteSlice = createSlice({
  name: "favorite",
  initialState,
  reducers: {
    getFavorite(state, action: PayloadAction<LensData>) {
      state.favorites.push(action.payload);
    },
    deleteFavorite(state, action: PayloadAction<string>) {
      state.favorites = state.favorites.filter((favorite) => favorite._id !== action.payload);
    },
    toggleFavorite: (state, action: PayloadAction<string>): void => {
      const lensId = action.payload;
      const token = localStorage.getItem("token");
      const index = state.favorites.findIndex((c) => c._id === lensId);

      if (index !== -1) {
        const updatedFavorites = [...state.favorites]; // Create a new array

        // Update the isFavorite field of the corresponding card in the new array
        updatedFavorites[index] = {
          ...updatedFavorites[index],
          isFavorite: !updatedFavorites[index].isFavorite,
        };

        const favoriteStatus = updatedFavorites[index].isFavorite;

        // Replace the cards array in the state with the updated array
        state.favorites = updatedFavorites;

        // Update the favorites array in the state
        if (favoriteStatus) {
          state.favorites = state.favorites.filter(
            (favorite) => favorite._id !== lensId
          );

        } else {
          state.favorites[index].isFavorite =
            !state.favorites[index].isFavorite;
        }

        // Send a request to the server to update the favorite status
        axios
          .post(
            `http://localhost:3001/api/lenses/${lensId}/favorite`,
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
            console.error("Failed to update favorite status", error);
            // Reset the local favorite status to its previous value
            state.favorites[index].isFavorite = !favoriteStatus;
            // Reset the favorites array in the state
            if (favoriteStatus) {
            state.favorites[index].isFavorite =
              !state.favorites[index].isFavorite;

            } else {
               state.favorites = state.favorites.filter(
                 (favorite) => favorite._id !== lensId
               );
            }
          });
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFavoriteLenses.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchFavoriteLenses.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.favorites = action.payload;
      })
      .addCase(fetchFavoriteLenses.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
}); 

export const selectFavorites = (state: RootState) => state.card.favorites;

export const { getFavorite, deleteFavorite } = favoriteSlice.actions;

export default favoriteSlice.reducer;