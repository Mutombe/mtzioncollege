import { configureStore } from "@reduxjs/toolkit";
import registrationSlice from "./registrationSlice";

const store = configureStore({
  reducer: {
    registration: registrationSlice
  },
});

export default store;