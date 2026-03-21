import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  ngo: { ownerName: '' },
};

export const ngoSlice = createSlice({
  name: 'ngo',
  initialState,
  reducers: {
    setNgo: (state, action) => {
      state.ngo = action.payload;
    },
  },
});

export const { setNgo } = ngoSlice.actions;

export default ngoSlice.reducer;
