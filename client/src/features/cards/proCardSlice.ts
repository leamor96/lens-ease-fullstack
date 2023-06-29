import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { ProLensData } from "../../@types";
import FavAlert from "../../components/utils/FavAlert";
import axios from "../../api/axios";

interface ProCardState {
  proCards: ProLensData[];
  favoritesPro: string[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null | undefined;
}

const initialState: ProCardState = {
  proCards: [],
  favoritesPro: [],
  status: "idle",
  error: null,
};

export const fetchProCards = createAsyncThunk(
  "proCard/fetchProCards",
  async () => {
    const response = await axios.get<ProLensData[]>("/pro-lenses");
    return response.data;
  }
);

const proCardSlice = createSlice({
  name: "proCard",
  initialState,
  reducers: {
    addProCard(state, action: PayloadAction<ProLensData>) {
      state.proCards.push(action.payload);
    },
    deleteProCard(state, action: PayloadAction<string>) {
      state.proCards = state.proCards.filter(
        (proCard) => proCard._id !== action.payload
      );
    },
    editProCard(state, action: PayloadAction<ProLensData>) {
      const { _id } = action.payload;
      const index = state.proCards.findIndex((proCard) => proCard._id === _id);
      if (index !== -1) {
        state.proCards[index] = action.payload;
      }
    },
    toggleFavorite: (state, action: PayloadAction<ProLensData>): void => {
      const proLens = action.payload;
      const proLensId = proLens._id;
      const userId = localStorage.getItem("userId");
      const index = state.proCards.findIndex((c) => c._id === proLensId);

      if (index !== -1) {
        const updatedCardPro = [...state.proCards];
        updatedCardPro[index] = {
          ...updatedCardPro[index],
          isFavorite: !updatedCardPro[index].isFavorite,
        };

        const favoriteProStatus = updatedCardPro[index].isFavorite;

        state.proCards = updatedCardPro;

        axios
          .post(`/pro-lenses/${userId}/favorite/${proLensId}`)
          .then((response) => {})
          .catch((error) => {
            FavAlert({ title: error.response?.data });
            console.error("Failed to update favorite status", error);
            state.proCards[index].isFavorite = !favoriteProStatus;
          });
      }
    },
    toggleUnFavorite: (state, action: PayloadAction<ProLensData>): void => {
      const proLens = action.payload;
      const proLensId = proLens._id;
      const userId = localStorage.getItem("userId");

      const index = state.proCards.findIndex((c) => c._id === proLensId);

      if (index !== -1) {
        const updatedCardPro = [...state.proCards];
        updatedCardPro[index] = {
          ...updatedCardPro[index],
          isFavorite: !updatedCardPro[index].isFavorite,
        };

        const proFavoriteStatus = updatedCardPro[index].isFavorite;
        state.proCards = updatedCardPro;

        axios
          .delete(`/pro-lenses/${userId}/delete-from-pro-favorite/${proLensId}`)
          .then((response) => {})
          .catch((error) => {
            FavAlert({ title: error.response?.data });
            console.error("Failed to update favorite status", error);
            state.proCards[index].isFavorite = !proFavoriteStatus;
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
        state.proCards = action.payload;
      })
      .addCase(fetchProCards.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const {
  addProCard,
  deleteProCard,
  editProCard,
  toggleFavorite,
  toggleUnFavorite,
} = proCardSlice.actions;

export default proCardSlice.reducer;
