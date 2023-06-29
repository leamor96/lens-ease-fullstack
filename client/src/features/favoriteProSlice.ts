import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { ProLensData } from "../@types";
import axios from "../api/axios";

interface FavoriteProState {
  favoritesPro: ProLensData[]; 
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null | undefined;
}

const initialState: FavoriteProState = {
  favoritesPro: [],
  status: "idle",
  error: null,
};

export const fetchFavoriteProLenses = createAsyncThunk(
  "proCard/fetchFavoriteProLenses",
  async () => {
    const userId = localStorage.getItem("userId");
  
    const { data } = await axios.get<ProLensData[]>(
      `/pro-lenses/${userId}/favorites`);
    return data;
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

export const { getFavoritePro, deleteFavoritePro } = favoriteProSlice.actions;

export default favoriteProSlice.reducer;
