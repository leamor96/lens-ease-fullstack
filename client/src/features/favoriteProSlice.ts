import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { ProLensData } from "../@types";

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
    const userId = localStorage.getItem("userId");
    /*   const { id } = useContext(AuthContext); */

    const { data } = await axios.get<ProLensData[]>(
      `http://localhost:3001/api/pro-lenses/${userId}/favorites`,
      {
        headers: {
          Authorization: `${token}`,
        },
      }
    );
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
