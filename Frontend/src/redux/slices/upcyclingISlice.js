import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  upcyclingI: {
    email: '',
    phone: '',
    companyName: '',
    upcyclingMethods: '',
  },
  isLoading: false,
  error: null,
};

export const upcyclingISlice = createSlice({
  name: 'upcyclingI',
  initialState,
  reducers: {
    setUpcyclingI: (state, action) => {
      state.upcyclingI = action.payload;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    updateUpcyclingI: (state, action) => {
      state.upcyclingI = action.payload;
    },
  },
});

export const { setUpcyclingI, setIsLoading, setError, updateUpcyclingI } = upcyclingISlice.actions;

export default upcyclingISlice.reducer;
