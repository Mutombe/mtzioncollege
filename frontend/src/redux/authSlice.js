import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../API/axios";

export const signupApi = (username, email, password) => {
  return axios.post("http://127.0.0.1:8000/signup", {
    username: username,
    email: email,
    password: password,
  });
};

export const loginApi = (username, password) => {
  return axios.post("http://127.0.0.1:8000/login", { username: username, password: password });
};

export const logoutApi = () => {
  return axios.post("http://127.0.0.1:8000/logout");
};

export const fetchUser = createAsyncThunk(
  "auth/fetchUser",
  async (_, { rejectWithValue }) => {
    try {
      const response = api.get("/user");
      console.log(response);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (credentials = { username, password }, { rejectWithValue }) => {
    try {
      const response = await loginApi(
        credentials.username,
        credentials.password
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const signup = createAsyncThunk(
  "auth/signup",
  async (userData = { username, email, password }, { rejectWithValue }) => {
    try {
      const response = await signupApi(
        userData.username,
        userData.email,
        userData.password
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const logout = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      logoutApi();
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: JSON.parse(localStorage.getItem("user")) || null,
    token: localStorage.getItem("token") || null,
    current_user: [],
    error: null,
    loading: false,
  },
  reducers: {
    clearAuth(state) {
      state.user = null;
      state.token = null;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.user = action.payload.user;
        state.loading = false;
        localStorage.setItem("token", action.payload.token);
        localStorage.setItem("user", JSON.stringify(action.payload.user));
      })
      .addCase(login.rejected, (state, action) => {
        state.error = action.payload;
        console.log("Login", state.error);
        state.loading = false;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.user = action.payload.user;
        localStorage.setItem("token", action.payload.token);
        localStorage.setItem("user", JSON.stringify(action.payload.user));
      })
      .addCase(signup.rejected, (state, action) => {
        state.error =
          action.payload.email ||
          action.payload.username ||
          action.payload.password;
      })
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = true;
        state.current_user = action.payload;
      })
      .addCase(fetchUser.rejected, (state) => {
        state.loading = false;
        state.error = action.payload
      })
      .addCase(logout.fulfilled, (state) => {
        state.token = null;
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      });
  },
});

export const { clearAuth } = authSlice.actions;
export default authSlice.reducer;
