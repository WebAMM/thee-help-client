import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { setMessage } from "./message";
import services from "../actions/services.action";

export const GetAllServices = createAsyncThunk(
  "Allservice",
  async (userId, thunkAPI) => {
    try {
      const response = await services.GetAllServices();
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

export const GetUserServices = createAsyncThunk(
  "service",
  async (userId, thunkAPI) => {
    try {
      const response = await services.GetUserServices(userId);
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

export const AddService = createAsyncThunk(
  "service/AddService",
  async (service, thunkAPI) => {
    try {
      const response = await services.AddService(service);
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

export const getServiceById = createAsyncThunk(
  "service/getServiceById",
  async (id, thunkAPI) => {
    try {
      const response = await services.getServiceById(id);
      thunkAPI.dispatch(setMessage(response.data.message));
      console.log(response.data.message);
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

export const deleteServiceById = createAsyncThunk(
  "service/deleteServiceById",
  async (id, thunkAPI) => {
    try {
      const response = await services.deleteServiceById(id);
      thunkAPI.dispatch(setMessage(response.data.message));
      console.log(response.data.message);
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

const serviceSlice = createSlice({
  name: "services",
  initialState: {
    data: [],
    loading: false,
    isSuccess: false,
    message: "",
  },
  reducers: {},
  extraReducers: {
    [AddService.pending]: (state, action) => {
      state.loading = true;
    },
    [AddService.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.data = payload;
      state.isSuccess = true;
    },
    [AddService.rejected]: (state, { payload }) => {
      state.loading = false;
      state.isSuccess = false;
      state.message = "failed";
    },
    [GetUserServices.pending]: (state, action) => {
      state.loading = true;
    },
    [GetUserServices.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.data = payload;
      state.isSuccess = true;
    },
    [GetUserServices.rejected]: (state, { payload }) => {
      state.loading = false;
      state.isSuccess = false;
      state.message = "failed";
    },
    [deleteServiceById.pending]: (state, action) => {
      state.loading = true;
    },
    [deleteServiceById.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.data = payload;
      state.isSuccess = true;
    },
    [deleteServiceById.rejected]: (state, { payload }) => {
      state.loading = false;
      state.isSuccess = false;
      state.message = "failed";
    },
    [getServiceById.pending]: (state, action) => {
      state.loading = true;
    },
    [getServiceById.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.data = payload;
      state.isSuccess = true;
    },
    [getServiceById.rejected]: (state, { payload }) => {
      state.loading = false;
      state.isSuccess = false;
      state.message = "failed";
    },
    [GetAllServices.pending]: (state, action) => {
      state.loading = true;
    },
    [GetAllServices.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.data = payload;
      state.isSuccess = true;
    },
    [GetAllServices.rejected]: (state, { payload }) => {
      state.loading = false;
      state.isSuccess = false;
      state.message = "failed";
    },
  },
});

export default serviceSlice;
