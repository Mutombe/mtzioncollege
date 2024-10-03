import { configureStore } from "@reduxjs/toolkit";
import registrationSlice from "./registrationSlice";
import branchSlice from "./branchSlice";
import gradeSlice from "./gradeSlice";
import formSlice from "./formSlice";

const store = configureStore({
  reducer: {
    registration: registrationSlice,
    branch: branchSlice,
    grade: gradeSlice,
    form: formSlice,
  },
});

export default store;