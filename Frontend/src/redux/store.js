import { configureStore } from '@reduxjs/toolkit';
import ngoReducer from './slices/ngoSlice';
import consumerReducer from './slices/consumerSlice';
import producerReducer from './slices/producerSlice';
import upcyclingIReducer from './slices/upcyclingISlice';

export const store = configureStore({
  reducer: {
    ngo: ngoReducer,
    consumer: consumerReducer,
    producer: producerReducer,
    upcyclingI: upcyclingIReducer,
  },
});
