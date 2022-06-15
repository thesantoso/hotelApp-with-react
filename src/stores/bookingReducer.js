import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  currentBook: [],
  paymentHistory: [],
};

export const bookingSlice = createSlice({
  name: 'booking',
  initialState: initialState,
  reducers: {
    setCurrentBook: (state, action) => {
      state.currentBook = action.payload; //tempat item akan menuju, dari Home, ke Detail, kemudian ke Current Book, terakhir ke Booking History jika di submit
    },
    setPaymentHistory: (state, action) => {
      state.paymentHistory = [...state.paymentHistory, action.payload];
    },
  },
  extraReducers: {},
});

export const {setCurrentBook, setBookingHistory, setPaymentHistory} =
  bookingSlice.actions;

export default bookingSlice.reducer;
