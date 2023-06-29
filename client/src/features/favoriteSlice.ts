import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { LensData } from "../@types";
import { RootState } from "../app/store";
import { API_URL } from "../env";

interface FavoritesState {
  favorites: LensData[]; 
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null | undefined;
}

const initialState: FavoritesState = {
  favorites: [],
  status: "idle",
  error: null,
};

export const fetchFavoriteLenses = createAsyncThunk(
  "card/fetchFavoriteLenses",
  async () => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    const { data } = await axios.get<LensData[]>(
      `${API_URL}/lenses/${userId}/favorites`,
      {
        headers: {
          Authorization: `${token}`,
        },
      }
    );

    return data;
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
      state.favorites = state.favorites.filter(
        (favorite) => favorite._id !== action.payload
      );
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
