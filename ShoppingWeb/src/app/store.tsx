import { configureStore } from '@reduxjs/toolkit'
import CartSlice from '../features/CartSlice'
import WishlistSlice from '../features/WishlistSlice';


export const store = configureStore({
  reducer: {
    cart: CartSlice,
    wishlist: WishlistSlice,
  },
})
store.subscribe(() => {
  const state = store.getState();
  localStorage.setItem("cartItems", JSON.stringify(state.cart.items));
  localStorage.setItem("wishlistItems", JSON.stringify(state.wishlist.items));

});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch