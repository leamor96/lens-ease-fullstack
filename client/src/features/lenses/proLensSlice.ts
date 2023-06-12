import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { submitProFormDataToServer } from "../../services/lens.service";
import { AppThunk, RootState } from "../../app/store";
import { LensFormData, LensOptions, LensProFormData } from "../../@types";

interface ProLensState {
  lensOptions: LensOptions;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null | undefined;
}

const initialState: ProLensState = {
  lensOptions: {
    rightEyeOptions: [],
    leftEyeOptions: [],
  },
  status: "idle",
  error: null,
};

// Thunk action to fetch the ProLens data
export const fetchProLensOptions = createAsyncThunk(
  "pro-lens/fetchProLensOptions",
  async () => {
    try {
      const response = await axios.post(
        "http://localhost:3001/api/submit-pro-form"
      );
      const { rightEyeOptions, leftEyeOptions } = response.data;

      return {
        rightEyeOptions,
        leftEyeOptions,
      };
    } catch (error) {
      throw new Error("Failed to fetch lens options");
    }
  }
);

const proLensSlice = createSlice({
  name: "proLens",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProLensOptions.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProLensOptions.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.lensOptions = action.payload;
      })
      .addCase(fetchProLensOptions.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});
export default proLensSlice.reducer;

export const selectProLensOptions = (state: RootState) => state.proLens.lensOptions;

export const submitProFormData =
  (proFormData: LensProFormData): AppThunk =>
  async () => {
    try {
      const { data } = await submitProFormDataToServer(proFormData);

      return data;

      // After successfully submitting the form, fetch the updated lens options
      // dispatch(fetchLensOptions());
    } catch (error) {
      throw new Error("Failed to submit form data to the server.");
    }
  };
