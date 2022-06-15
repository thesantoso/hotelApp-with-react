import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchHotel = createAsyncThunk('hotel/fetchHotel', async () => {
  try {
    const res = await axios({
      method: 'GET',
      url: 'https://hotels4.p.rapidapi.com/properties/list?destinationId=1506246&pageNumber=1&pageSize=10&checkIn=2022-05-20&checkOut=2022-05-27&adults1=1&sortOrder=PRICE&locale=en_US&currency=IDR',
      headers: {
        'content-type': 'application/octet-stream',
        'x-rapidapi-host': 'hotels4.p.rapidapi.com',
        'x-rapidapi-key': 'c19d3f542dmshb0260884d91b3bep19caa8jsne06d29c23052',
      },
    });
    const formatRes = await res.data.data.body.searchResults.results;
    return formatRes;
  } catch (error) {
    console.warn(error);
  }
});

export const searchHotel = createAsyncThunk('hotel/searchHotel', async url => {
  try {
    const res = await axios({
      method: 'GET',
      url: url,
      headers: {
        'content-type': 'application/octet-stream',
        'x-rapidapi-host': 'hotels4.p.rapidapi.com',
        'x-rapidapi-key': 'c19d3f542dmshb0260884d91b3bep19caa8jsne06d29c23052',
      },
    });
    const formatRes = await res.data.suggestions[1].entities;
    // console.warn(formatRes);
    return formatRes;
  } catch (error) {
    console.warn(error);
  }
});

export const getFeatures = createAsyncThunk('hotel/getFeatures', async url => {
  try {
    const res = await axios({
      method: 'GET',
      url: url,
      headers: {
        'content-type': 'application/octet-stream',
        'x-rapidapi-host': 'hotels4.p.rapidapi.com',
        'x-rapidapi-key': 'c19d3f542dmshb0260884d91b3bep19caa8jsne06d29c23052',
      },
    });
    const formatRes = await res.data.data.body.propertyDescription;
    // console.warn(formatRes);
    return formatRes;
  } catch (error) {
    console.warn(error);
  }
});

export const hotelSlice = createSlice({
  name: 'hotel',
  initialState: {
    hotelList: [
      // this is just a dummy to draw a structure of fetching result above
      {
        id: 2159513600,
        name: 'Hotel Pergola JFK Airport',
        starRating: 2.5,
        address: {
          countryName: 'United States',
        },
        optimizedThumbUrls: {
          srpDesktop:
            'https://exp.cdn-hotels.com/hotels/68000000/67460000/67453600/67453550/556383f5_z.jpg?impolicy=fcrop&w=250&h=140&q=high',
        },
        ratePlan: {
          price: {
            exactCurrent: 41.29,
          },
        },
      },
    ],
    searchResult: [],
    hotelDetail: [],
    hotelFeatures: [],
    cityList: [
      {
        imageUrl:
          'https://images.unsplash.com/photo-1617234084793-11a2b9345949?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374',
        cityName: 'Bandung',
        cityValue: 'bandung',
      },
      {
        imageUrl:
          'https://images.unsplash.com/photo-1590930754517-64d5fffa06ac?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374',
        cityName: 'Jakarta',
        cityValue: 'jakarta',
      },
      {
        imageUrl:
          'https://images.unsplash.com/photo-1604999333679-b86d54738315?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1450',
        cityName: 'Bali',
        cityValue: 'bali',
      },
    ],
    isLoading: false,
    searchQuery: {
      city: null,
      currency: 'usd',
    },
  },
  reducers: {
    updateSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    setDetail: (state, action) => {
      state.hotelDetail = action.payload;
    },
    setLoading: state => {
      state.isLoading = true;
    },
  },
  extraReducers: {
    [fetchHotel.fulfilled]: (state, action) => {
      state.hotelList = action.payload;
      state.isLoading = false;
    },
    [fetchHotel.pending]: state => {
      state.isLoading = true;
    },
    [searchHotel.fulfilled]: (state, action) => {
      state.searchResult = action.payload;
      state.isLoading = false;
    },
    [searchHotel.pending]: state => {
      state.isLoading = true;
    },
    [getFeatures.fulfilled]: (state, action) => {
      state.hotelFeatures = action.payload;
      state.isLoading = false;
    },
    [getFeatures.pending]: state => {
      state.isLoading = true;
    },
  },
});

export const {updateSearchQuery, setDetail, setLoading} = hotelSlice.actions;

export default hotelSlice.reducer;
