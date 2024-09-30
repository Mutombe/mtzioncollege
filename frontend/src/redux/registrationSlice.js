import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchRegistrations = createAsyncThunk(
  'registration/fetchRegistrations',
  async (_, { getState }) => {
    const { getAccessTokenSilently } = getState().auth;
    const token = await getAccessTokenSilently();
    const response = await axios.get('http://your-django-api.com/api/registrations/', {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  }
);

export const createRegistration = createAsyncThunk(
  'registration/createRegistration',
  async (registrationData, { getState }) => {
    const { getAccessTokenSilently } = getState().auth;
    const token = await getAccessTokenSilently();
    const response = await axios.post('http://your-django-api.com/api/registrations/', registrationData, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  }
);

export const adminAction = createAsyncThunk(
  'registration/adminAction',
  async ({ registrationId, action, adminNotes }, { getState }) => {
    const { getAccessTokenSilently } = getState().auth;
    const token = await getAccessTokenSilently();
    const response = await axios.post(
      `http://your-django-api.com/api/registrations/${registrationId}/admin_action/`,
      { action, admin_notes: adminNotes },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return { ...response.data, id: registrationId };
  }
);

const registrationSlice = createSlice({
  name: 'registration',
  initialState: {
    registrations: [],
    status: 'idle',
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRegistrations.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchRegistrations.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.registrations = action.payload;
      })
      .addCase(fetchRegistrations.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(createRegistration.fulfilled, (state, action) => {
        state.registrations.push(action.payload);
      })
      .addCase(adminAction.fulfilled, (state, action) => {
        const index = state.registrations.findIndex(reg => reg.id === action.payload.id);
        if (index !== -1) {
          state.registrations[index] = {
            ...state.registrations[index],
            status: action.payload.status,
            admin_notes: action.payload.admin_notes
          };
        }
      });
  }
});

export default registrationSlice.reducer;