import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchDetails = createAsyncThunk(
  "registration/fetchDetails",
  async ({ id, type }, { rejectWithValue }) => {
    try {
      const endpoint = type === "grade" ? `/grades/${id}` : `/forms/${id}`;
      const response = await authAxios.get(endpoint);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchRegistrations = createAsyncThunk(
  "registration/fetchRegistrations",
  async (_, { getState }) => {
    const { getAccessTokenSilently } = getState().auth;
    const token = await getAccessTokenSilently();
    const response = await axios.get("registrations/", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  }
);

export const createRegistration = createAsyncThunk(
  "registration/createRegistration",
  async (registrationData) => {
    //const { getAccessTokenSilently } = getState().auth;
    //const token = await getAccessTokenSilently();

    const formData = new FormData();
    for (const key in registrationData) {
      if (key === "report_card_images") {
        registrationData[key].forEach((image, index) => {
          formData.append(`report_card_images[${index}]image`, image);
        });
      } else if (key === "report_card_pdf") {
        formData.append("report_card_pdf", registrationData[key]);
      } else if (key === "transfer_letter" || key === "birth_certificate") {
        formData.append(key, registrationData[key]);
      } else {
        formData.append(key, registrationData[key]);
      }
    }

    const response = await axios.post(
      "http://127.0.0.1:8000/registrations/",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  }
);

export const registerForm = createAsyncThunk(
  "registration/registerForm",
  async (form_id, { rejectWithValue }) => {
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
  async (grade_id, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `register/${grade_id}/`,
        registrationData
      );
      return response.data;
    } catch (error) {
      console.log("Booking Error", error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const approveRegistration = createAsyncThunk(
  "bookings/approveRegistration",
  async (registration_id, { rejectWithValue }) => {
    try {
      const response = await authAxios.post(
        `approve/booking/${registration_id}/`
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
      const response = await authAxios.post(`deny/booking/${registration_id}/`);
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
    details: {},
    loading: false,
    success: false,
    error: null,
  },
  reducers: {
    setBookingDetails: (state, action) => {
      state.bookingData = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.details = action.payload;
      })
      .addCase(fetchDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
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
      .addCase(createRegistration.pending, (state) => {
        state.loading = true;
      })
      .addCase(createRegistration.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.registrations.push(action.payload);
      })
      .addCase(createRegistration.rejected, (state, action) => {
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
