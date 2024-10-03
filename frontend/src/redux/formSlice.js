import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchForms = createAsyncThunk(
  "branches/fetchForms",
  async ({ branchId }) => {
    const response = await axios.get(`http://127.0.0.1:8000/branches/${branchId}/forms/`);
    return response.data;
  }
);

const branchesSlice = createSlice({
  name: "forms",
  initialState: {
    forms: [],
    loading: false,
    success: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchForms.pending, (state) => {
        state.success = false;
        state.loading = true;
      })
      .addCase(fetchForms.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.forms = action.payload;
      })
      .addCase(fetchForms.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.error.message;
      });
  },
});

export default branchesSlice.reducer;
