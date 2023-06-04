import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ThunkDispatch, ThunkAction } from "@reduxjs/toolkit";
import { AnyAction } from "redux";
import { RootState } from "../../app/store";
import { submitFormDataToServer } from "../../services/lens.service";
import { LensFormData, LensOptions } from "../../@types";
import axios from "axios";

// Define the initial state
interface LensState {
  lensOptions: LensOptions;
  loading: boolean;
  error: string | null;
}

const initialState: LensState = {
  lensOptions: {
    rightEyeOptions: [],
    leftEyeOptions: [],
  },
  loading: false,
  error: null,
};

const lensSlice = createSlice({
  name: "lens",
  initialState,
  reducers: {
    fetchLensDataStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchLensDataSuccess(state, action: PayloadAction<LensOptions>) {
      state.lensOptions = action.payload;
      state.loading = false;
      state.error=null;
    },
    fetchLensDataFailure(state, action: PayloadAction<string>) {
      const error = action.payload || "Unknown error occurred";
      state.loading = false;
      state.error = error as string;
    },
  },
});

export const {
  fetchLensDataStart,
  fetchLensDataSuccess,
  fetchLensDataFailure,
} = lensSlice.actions;

// Thunk action to fetch the lens data
export const fetchLensData =
  (): ThunkAction<Promise<void>, RootState, unknown, AnyAction> =>
  async (dispatch: ThunkDispatch<RootState, unknown, AnyAction>) => {
  try {
    dispatch(fetchLensDataStart());
    const response = await axios.post(
      "http://localhost:3001/api/submit-form",
      
    );
    const lensOptions = response.data;
    dispatch(fetchLensDataSuccess(lensOptions));
  } catch (error: any) {
    dispatch(fetchLensDataFailure(error.message));
  }
  };

// Thunk action to submit the form data
export const submitFormData =
  (
    formData: LensFormData
  ): ThunkAction<Promise<void>, RootState, unknown, AnyAction> =>
  async (dispatch: ThunkDispatch<RootState, unknown, AnyAction>) => {
    try {
      dispatch(fetchLensDataStart());
      await submitFormDataToServer(formData);
       const lensOptions = {
         rightEyeOptions: [],
         leftEyeOptions: [],
       };
      dispatch(fetchLensDataSuccess(lensOptions));
    } catch (error: any) {
      dispatch(fetchLensDataFailure(error.message));
      throw error; // Rethrow the error to handle it in the component
    }
  };

// Selectors to access the lens data from the Redux store
export const selectLensOptions = (state: RootState) => state.lens.lensOptions;
export const selectLensLoading = (state: RootState) => state.lens.loading;
export const selectLensError = (state: RootState) => state.lens.error;

export default lensSlice.reducer;
