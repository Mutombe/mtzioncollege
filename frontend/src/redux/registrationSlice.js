import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


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
  async (registrationData, { getState }) => {
    const { getAccessTokenSilently } = getState().auth;
    const token = await getAccessTokenSilently();

    const formData = new FormData();
    for (const key in registrationData) {
      if (key === 'report_card_images') {
        registrationData[key].forEach((image, index) => {
          formData.append(`report_card_images[${index}]image`, image);
        });
      } else if (key === 'report_card_pdf') {
        formData.append('report_card_pdf', registrationData[key]);
      } else if (key === 'transfer_letter' || key === 'birth_certificate') {
        formData.append(key, registrationData[key]);
      } else {
        formData.append(key, registrationData[key]);
      }
    }

    const response = await axios.post("/registrations/register/", formData, {
      headers: { 
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data'
      },
    });
    return response.data;
  }
);

export const adminAction = createAsyncThunk(
  "registration/adminAction",
  async ({ registrationId, action, adminNotes }, { getState }) => {
    const { getAccessTokenSilently } = getState().auth;
    const token = await getAccessTokenSilently();
    const response = await axios.post(
      `/registrations/${registrationId}/admin_action/`,
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
    loading: false,
    success: false,
    error: null,
  },
  reducers: {},
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