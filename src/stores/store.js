import {configureStore} from '@reduxjs/toolkit';
import userReducer from './userReducer';
import hotelReducer from './hotelReducer';
import wishlistReducer from './wishlistReducer';
import bookingReducer from './bookingReducer';

export const store = configureStore({
  reducer: {
    user: userReducer,
    hotel: hotelReducer,
    wishlist: wishlistReducer,
    booking: bookingReducer,
  },
});
