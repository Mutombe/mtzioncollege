import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import api from "../API/axios";

export const fetchRegistrations = createAsyncThunk(
  "registration/fetchRegistrations",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/registrations/");
      console.log("Response", response)
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);


export const registerForm = createAsyncThunk(
  "registration/registerForm",
  async ({ form_id, registrationData }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `register/${form_id}/`,
        registrationData
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const registerGrade = createAsyncThunk(
  "registration/registerGrade",
  async ({ grade_id, registrationData }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `register/${grade_id}/`,
        registrationData
      );
      return response.data;
    } catch (error) {
      console.log("Registration Error", error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const approveRegistration = createAsyncThunk(
  "bookings/approveRegistration",
  async (registration_id, { rejectWithValue }) => {
    try {
      const response = await authAxios.post(
        `approve/registration/${registration_id}/`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const denyRegistration = createAsyncThunk(
  "bookings/denyRegistration",
  async (registration_id, { rejectWithValue }) => {
    try {
      const response = await authAxios.post(`deny/registration/${registration_id}/`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const adminAction = createAsyncThunk(
  "registration/adminAction",
  async ({ registrationId, action, adminNotes }, { getState }) => {
    const { getAccessTokenSilently } = getState().auth;
    const token = await getAccessTokenSilently();
    const response = await axios.post(
      `registrations/`,
      { action, admin_notes: adminNotes },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return { ...response.data, id: registrationId };
  }
);

const registrationSlice = createSlice({
  name: "registrations",
  initialState: {
    registrations: [],
    registrationsData: {},
    loading: false,
    success: false,
    error: null,
  },
  reducers: {
    setRegistrationsDetail: (state, action) => {
      state.registrationsData = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRegistrations.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchRegistrations.fulfilled, (state, action) => {
        state.success = true;
        state.registrations = action.payload;
      })
      .addCase(fetchRegistrations.rejected, (state, action) => {
        state.success = false;
        state.error = action.error.message;
      })

      //Grade
      .addCase(registerGrade.pending, (state) => {
        state.loading = true;
      })
      .addCase(registerGrade.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.registrations.push(action.payload);
      })
      .addCase(registerGrade.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.error.message;
      })
      
      //form
      .addCase(registerForm.pending, (state) => {
        state.loading = true;
      })
      .addCase(registerForm.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.registrations.push(action.payload);
      })
      .addCase(registerForm.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.error.message;
      })
      .addCase(adminAction.fulfilled, (state, action) => {
        const index = state.registrations.findIndex(
          (reg) => reg.id === action.payload.id
        );
        if (index !== -1) {
          state.registrations[index] = {
            ...state.registrations[index],
            status: action.payload.status,
            admin_notes: action.payload.admin_notes,
          };
        }
      });
  },
});

export default registrationSlice.reducer;
