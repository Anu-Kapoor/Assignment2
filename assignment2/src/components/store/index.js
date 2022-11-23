import { configureStore } from '@reduxjs/toolkit';

import uiSlice from './ui-slice';
import dataSlice from './data-slice';

const store = configureStore({
  reducer: {ui: uiSlice.reducer, UserData: dataSlice.reducer },
});

export default store;
