import { configureStore } from '@reduxjs/toolkit'
import cartSlice from '../slices/cartSlice'
import searchSlice from '../slices/searchSlice'
import authSlice from '../slices/authSlice'
import predictionSlice from '../slices/predictionSlice'

export const store = configureStore({
  reducer: {
    cart: cartSlice,
    search: searchSlice,
    auth: authSlice,
    predictions: predictionSlice,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch