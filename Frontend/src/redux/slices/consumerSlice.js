import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  consumer: { fullname: '' },
};

export const consumerSlice = createSlice({
  name: 'consumer',
  initialState,
  reducers: {
    setConsumer: (state, action) => {
      state.consumer = action.payload;
    },
  },
});

export const { setConsumer } = consumerSlice.actions;

export default consumerSlice.reducer;
