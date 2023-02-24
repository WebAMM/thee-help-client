import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { setMessage } from "./message";

import AppointmentService from "../actions/appointment.action";

export const getAppointmentsByUserId = createAsyncThunk(
  "appointment/getAll",
  async (userId, thunkAPI) => {
    try {
      const response = await AppointmentService.getAppointmentsByUserId(userId);
      thunkAPI.dispatch(setMessage(response.data.message));
      return response.data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
);

export const addAppointmentsByUserId = createAsyncThunk(
  "appointment/addAppointment",
  async (appointment, thunkAPI) => {
    try {
      const response = await AppointmentService.addAppointmentsByUserId(
        appointment
      );
      thunkAPI.dispatch(setMessage(response.data.message));
      return response.data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
);

export const deleteAppointmentsById = createAsyncThunk(
  "appointment/deleteAppointment",
  async (appointmentId, thunkAPI) => {
    try {
      const response = await AppointmentService.deleteAppointmentsById(
        appointmentId
      );
      thunkAPI.dispatch(setMessage(response.data.message));
      return response.data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
);

const appointmentSlice = createSlice({
  name: "appointment",
  initialState: {},
  extraReducers: {
    [getAppointmentsByUserId.pending]: (state, action) => {
      state.loading = true;
    },
    [getAppointmentsByUserId.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.data = payload;
      state.isSuccess = true;
    },
    [getAppointmentsByUserId.rejected]: (state, { payload }) => {
      state.loading = false;
      state.isSuccess = false;
      state.message = "failed";
    },
    [addAppointmentsByUserId.pending]: (state, action) => {
      state.loading = true;
    },
    [addAppointmentsByUserId.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.data = payload;
      state.isSuccess = true;
    },
    [addAppointmentsByUserId.rejected]: (state, { payload }) => {
      state.loading = false;
      state.isSuccess = false;
      state.message = "failed";
    },
    [deleteAppointmentsById.pending]: (state, action) => {
      state.loading = true;
    },
    [deleteAppointmentsById.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.data = payload;
      state.isSuccess = true;
    },
    [deleteAppointmentsById.rejected]: (state, { payload }) => {
      state.loading = false;
      state.isSuccess = false;
      state.message = "failed";
    },
  },
});

const { reducer } = appointmentSlice;
export default reducer;
