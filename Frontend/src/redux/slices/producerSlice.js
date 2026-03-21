import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  producer: {
    fullname: '',
    email: '',
    phone: '',
    companyName: '',
    items: [],
  },
  isLoading: false,
  error: null,
};

export const producerSlice = createSlice({
  name: 'producer',
  initialState,
  reducers: {
    setProducer: (state, action) => {
      state.producer = action.payload;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    updateProducer: (state, action) => {
      state.producer = action.payload;
    },
  },
});

export const { setProducer, setIsLoading, setError, updateProducer } = producerSlice.actions;

export default producerSlice.reducer;
