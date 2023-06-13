import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { ProLensData } from "../../@types";

interface ProCardState {
  proCards: ProLensData[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null | undefined;
}

const initialState: ProCardState = {
  proCards: [],
  status: "idle",
  error: null,
};

// Async thunk to fetch the proCard data from the server
export const fetchProCards = createAsyncThunk("proCard/fetchProCards", async () => {
  const response = await axios.get("http://localhost:3001/api/pro-lenses");
  return response.data;
});

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
      })
  },
});

export const { addProCard, deleteProCard, editProCard } =
  proCardSlice.actions;

export default proCardSlice.reducer;
