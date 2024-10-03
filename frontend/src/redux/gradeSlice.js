import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchGrades = createAsyncThunk(
  "branches/fetchGrades",
  async ({ branchId }) => {
    const response = await axios.get(`http://127.0.0.1:8000/branches/${branchId}/grades/`);
    return response.data;
  }
);

const branchesSlice = createSlice({
  name: "grades",
  initialState: {
    grades: [],
    loading: false,
    success: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGrades.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchGrades.fulfilled, (state, action) => {
        state.success = true;
        state.loading = false;
        state.grades = action.payload;
        console.log("payload", action.payload);
      })
      .addCase(fetchGrades.rejected, (state, action) => {
        state.success = false;
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default branchesSlice.reducer;
