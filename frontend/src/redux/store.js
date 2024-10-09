import { configureStore } from "@reduxjs/toolkit";
import registrationSlice from "./registrationSlice";
import authSlice from "./authSlice"
import branchSlice from "./branchSlice";
import gradeSlice from "./gradeSlice";
import formSlice from "./formSlice";

const store = configureStore({
  reducer: {
    registration: registrationSlice,
    branch: branchSlice,
    grade: gradeSlice,
    auth: authSlice,
    form: formSlice,
  },
});

export default store;