import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

import lensReducer from "../features/lenses/lensSlice"
import cardReducer from "../features/cards/cardSlice"
import proLensReducer from "../features/lenses/proLensSlice";
import proCardReducer from "../features/cards/proCardSlice";
import favoriteReducer from "../features/favoriteSlice";
import favoriteProReducer from "../features/favoriteProSlice";

export const store = configureStore({
  reducer: {
   lens: lensReducer,
   proLens:proLensReducer,
   card: cardReducer,
   proCard: proCardReducer,
   favorite:favoriteReducer,
   favoritePro:favoriteProReducer,
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
