import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface WishlistItem {
  id: number;
  name: string;
  description: string;
  price: number;
  img_Address: any;
}

interface WishlistState {
  items: WishlistItem[];
}

const storedWishlist = localStorage.getItem("wishlistItems");
const initialState: WishlistState = {
  items: storedWishlist ? JSON.parse(storedWishlist) : [],
};

export const WishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    addToWishlist: (state, action: PayloadAction<WishlistItem>) => {
      const exists = state.items.find(item => item.id === action.payload.id);
      if (!exists) {
        state.items.push(action.payload);
      }
    },
    removeFromWishlist: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    resetWishlist: (state) => {
      state.items = [];
    }
  },
});

export const { addToWishlist, removeFromWishlist, resetWishlist } = WishlistSlice.actions;
export default WishlistSlice.reducer;
