import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import {  ProLensData } from "../@types";

interface FavoriteProState {
  favoritesPro: ProLensData[]; // Array of card IDs that are marked as favorites
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null | undefined;
}

const initialState: FavoriteProState = {
  favoritesPro: [],
  status: "idle",
  error: null,
};

// Async thunk to fetch the favorite proLenses data from the server
export const fetchFavoriteProLenses = createAsyncThunk(
  "proCard/fetchFavoriteProLenses",
  async () => {
    const token = localStorage.getItem("token");
    const response = await axios.get<ProLensData[]>(
      `http://localhost:3001/api/pro-lenses/favorites/:id`,
      {
        headers: {
          Authorization: `${token}`,
        },
      }
    );
    return response.data;
  }
);

const favoriteProSlice = createSlice({
  name: "favoritePro",
  initialState,
  reducers: {
    getFavoritePro(state, action: PayloadAction<ProLensData>) {
      state.favoritesPro.push(action.payload);
    },
    deleteFavoritePro(state, action: PayloadAction<string>) {
      state.favoritesPro = state.favoritesPro.filter(
        (proCard) => proCard._id !== action.payload
      );
    },
    toggleFavorite: (state, action: PayloadAction<string>): void => {
      const proLensId = action.payload;
      const token = localStorage.getItem("token");
      const index = state.favoritesPro.findIndex((c) => c._id === proLensId);

      if (index !== -1) {
        const updatedFavoritesPro = [...state.favoritesPro]; // Create a new array

        // Update the isFavorite field of the corresponding card in the new array
        updatedFavoritesPro[index] = {
          ...updatedFavoritesPro[index],
          isFavorite: !updatedFavoritesPro[index].isFavorite,
        };

        const favoriteProStatus = updatedFavoritesPro[index].isFavorite;

        // Replace the cards array in the state with the updated array
        state.favoritesPro = updatedFavoritesPro;

        // Update the favorites array in the state
        if (favoriteProStatus) {
          state.favoritesPro = state.favoritesPro.filter(
            (favorite) => favorite._id !== proLensId
          );
        } else {
          state.favoritesPro[index].isFavorite =
            !state.favoritesPro[index].isFavorite;
        }

        // Send a request to the server to update the favorite status
        axios
          .post(
            `http://localhost:3001/api/pro-lenses/${proLensId}/favorite`,
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
            state.favoritesPro[index].isFavorite = !favoriteProStatus;
            // Reset the favorites array in the state
            if (favoriteProStatus) {
              state.favoritesPro[index].isFavorite =
                !state.favoritesPro[index].isFavorite;
            } else {
              state.favoritesPro = state.favoritesPro.filter(
                (favorite) => favorite._id !== proLensId
              );
            }
          });
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFavoriteProLenses.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchFavoriteProLenses.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.favoritesPro = action.payload;
      })
      .addCase(fetchFavoriteProLenses.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { getFavoritePro, deleteFavoritePro, toggleFavorite } =
  favoriteProSlice.actions;

export default favoriteProSlice.reducer;
