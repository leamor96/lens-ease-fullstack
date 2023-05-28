import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ThunkDispatch, ThunkAction } from "@reduxjs/toolkit";

import { AnyAction } from "redux";
import { RootState} from "../../app/store";
import {
  getLensData,
  submitFormDataToServer,
} from "../../services/lens.service";
import { Lens } from "../../@types";

// Define the initial state
interface LensState {
  data: Lens[];
  loading: boolean;
  error: string | null;
}

const initialState: LensState = {
  data: [],
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
    fetchLensDataSuccess(state, action: PayloadAction<Lens[]>) {
      state.data = action.payload;
      state.loading = false;
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
      const response = await getLensData();
      const lensData = response.data; // Extract the data from the AxiosResponse object
      dispatch(fetchLensDataSuccess(lensData));
    } catch (error: any) {
      dispatch(fetchLensDataFailure(error.message));
    }
  };

export const submitFormData =
  (formData: FormData): ThunkAction<
  Promise<void>,
  RootState,
  unknown,
  AnyAction>=>
  async (dispatch: ThunkDispatch<RootState, unknown, AnyAction>) => {
    try {
      dispatch(fetchLensDataStart());
      await submitFormDataToServer(formData);
      const response = await getLensData();
      const lensData = response.data;
      dispatch(fetchLensDataSuccess(lensData));
    } catch (error: any) {
      dispatch(fetchLensDataFailure(error.message));
    }
  };

// Selectors to access the lens data from the Redux store
export const selectLensData = (state: RootState) => state.lens.data;
export const selectLensLoading = (state: RootState) => state.lens.loading;
export const selectLensError = (state: RootState) => state.lens.error;

export default lensSlice.reducer;
