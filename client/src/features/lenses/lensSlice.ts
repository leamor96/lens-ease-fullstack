import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { submitFormDataToServer } from "../../services/lens.service";
import { AppThunk, RootState } from "../../app/store";
import {  LensFormData, LensOptions } from "../../@types";

interface LensState {
  lensOptions: LensOptions;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null | undefined;
}

const initialState: LensState = {
  lensOptions: {
    rightEyeOptions: [],
    leftEyeOptions: [],
  },
  status: "idle",
  error: null,
};

// Thunk action to fetch the lens data
export const fetchLensOptions = createAsyncThunk("lens/fetchLensOptions", async () => {
  try {
    const response = await axios.post("http://localhost:3001/api/submit-form");
    const { rightEyeOptions, leftEyeOptions } = response.data;

    return {
      rightEyeOptions,
      leftEyeOptions,
    };
  } catch (error) {
    throw new Error("Failed to fetch lens options");
  }
});

const lensSlice = createSlice({
  name: "lens",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLensOptions.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchLensOptions.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.lensOptions = action.payload;
      })
      .addCase(fetchLensOptions.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});
export default lensSlice.reducer;

export const selectLensOptions = (state: RootState) => state.lens.lensOptions;

export const submitFormData =
  (formData: LensFormData): AppThunk =>
  async (dispatch) => {
    try {
      const requestBody = {
        sphRight: formData.sphRight,
        cylRight: formData.cylRight,
        sphLeft: formData.sphLeft,
        cylLeft: formData.cylLeft,
      };
      await submitFormDataToServer(requestBody)

      // After successfully submitting the form, fetch the updated lens options
      dispatch(fetchLensOptions());
    } catch (error) {
      throw new Error("Failed to submit form data to the server.");
    }
  };
