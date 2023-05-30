import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

import lensReducer from "../features/lenses/lensSlice"
import cardReducer from "../features/cards/cardSlice"


export const store = configureStore({
  reducer: {
   lens: lensReducer,
   card: cardReducer,
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
