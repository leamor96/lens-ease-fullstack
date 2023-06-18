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
    toggleFavorite: (state, action: PayloadAction<string>): void => {
      const proLensId = action.payload;
      const token = localStorage.getItem("token");
const userId = localStorage.getItem("userId");

      const index = state.proCards.findIndex((c) => c._id === proLensId);

      if (index !== -1) {
        const updatedCardPro = [...state.proCards]; // Create a new array

        // Update the isFavorite field of the corresponding card in the new array
        updatedCardPro[index] = {
          ...updatedCardPro[index],
          isFavorite: !updatedCardPro[index].isFavorite,
        };

        const favoriteProStatus = updatedCardPro[index].isFavorite;

        // Replace the cards array in the state with the updated array
        state.proCards = updatedCardPro;


        // Send a request to the server to update the favorite status
        axios
          .post(
            `http://localhost:3001/api/pro-lenses/${userId}/favorite/${proLensId}`,
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
            state.proCards[index].isFavorite = !favoriteProStatus;
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

export const { addProCard, deleteProCard, editProCard ,toggleFavorite} =
  proCardSlice.actions;

export default proCardSlice.reducer;
