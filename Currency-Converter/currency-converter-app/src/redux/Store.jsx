// src/store.js
import { configureStore } from '@reduxjs/toolkit';
import themeReducer from './ThemeSlice'; // Import the theme slice

const store = configureStore({
  reducer: {
    theme: themeReducer,
  },
});

export default store;
