import {createSlice} from '@reduxjs/toolkit';
// import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = {
  username: 'testing',
  password: '123456789',
  fullName: 'Rizky Dwi Santoso',
  email: 'Rsantoso.me@gmail.com',
  gender: 'MALE',
  isAuth: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    userLogin: (state, action) => {
      if (
        state.username === action.payload.username &&
        state.password === action.payload.password
      ) {
        state.isAuth = true;
      } else {
        state.isAuth = false;
      }
    },
    userLogout: state => {
      state.isAuth = false;
    },
    userInfoUpdate: (state, action) => {
      (state.fullName = action.payload.fullName),
        (state.email = action.payload.email),
        (state.gender = action.payload.gender);
    },
  },
  extraReducers: {},
});

export const {userLogin, userLogout, userInfoUpdate} = userSlice.actions;

export default userSlice.reducer;
