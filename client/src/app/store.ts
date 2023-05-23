import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import lensReducer from "../features/lenses/lensSlice"


export const store = configureStore({
  reducer: {
   lens: lensReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
