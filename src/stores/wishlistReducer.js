import {createSlice} from '@reduxjs/toolkit';
// import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = {
  wishlist: [],
};

export const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState: initialState,
  reducers: {
    addWishlist: (state, action) => {
      state.wishlist = [...state.wishlist, action.payload];
    },
    updateWishlist: (state, action) => {
      state.wishlist = action.payload;
    },
  },
  extraReducers: {},
});

export const {addWishlist, updateWishlist} = wishlistSlice.actions;

export default wishlistSlice.reducer;
