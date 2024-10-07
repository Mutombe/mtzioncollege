import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchBranches = createAsyncThunk(
  "branches/fetchBranches",
  async () => {
    const response = await axios.get("http://127.0.0.1:8000/branches/");
    return response.data;
  }
);

const branchesSlice = createSlice({
  name: "branches",
  initialState: {
    branches: [],
    loading: false,
    success: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBranches.pending, (state) => {
        state.loading = true;
        state.success = false;
      })
      .addCase(fetchBranches.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.branches = action.payload;
        console.log("payload", action.payload);
      })
      .addCase(fetchBranches.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.error.message;
      });
  },
});

export default branchesSlice.reducer;
