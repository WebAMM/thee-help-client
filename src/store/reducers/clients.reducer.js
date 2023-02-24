import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { setMessage } from "./message";
import ClientService from "../actions/clients.actions";

export const getClientsByUserId = createAsyncThunk(
  "client/getClientsByUserId",
  async (userId, thunkAPI) => {
    try {
      const response = await ClientService.getAllClientsbyUserId(userId);
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

export const addClientByUserId = createAsyncThunk(
  "client/addClientByUserId",
  async (client, thunkAPI) => {
    try {
      const response = await ClientService.addClientByUserId(client);
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

export const getClientById = createAsyncThunk(
  "client/getClientById",
  async (client, thunkAPI) => {
    try {
      const response = await ClientService.getClientById(client);
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

export const deleteClientById = createAsyncThunk(
  "client/deleteClientById",
  async (client, thunkAPI) => {
    try {
      const response = await ClientService.deleteClientById(client);
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

const clientSlice = createSlice({
  name: "clients",
  initialState: {
    data: [],
    loading: false,
    isSuccess: false,
    message: "",
  },
  reducers: {},
  extraReducers: {
    [addClientByUserId.pending]: (state, action) => {
      state.loading = true;
    },
    [addClientByUserId.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.data = payload;
      state.isSuccess = true;
    },
    [addClientByUserId.rejected]: (state, { payload }) => {
      state.loading = false;
      state.isSuccess = false;
      state.message = "failed";
    },

    [getClientsByUserId.pending]: (state, action) => {
      state.loading = true;
    },
    [getClientsByUserId.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.data = payload;
      state.isSuccess = true;
    },
    [getClientsByUserId.rejected]: (state, { payload }) => {
      state.loading = false;
      state.isSuccess = false;
      state.message = "failed";
    },
    [getClientById.pending]: (state, action) => {
      state.loading = true;
    },
    [getClientById.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.data = payload;
      state.isSuccess = true;
    },
    [getClientById.rejected]: (state, { payload }) => {
      state.loading = false;
      state.isSuccess = false;
      state.message = "failed";
    },
    [deleteClientById.pending]: (state, action) => {
      state.loading = true;
    },
    [deleteClientById.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.data = payload;
      state.isSuccess = true;
    },
    [deleteClientById.rejected]: (state, { payload }) => {
      state.loading = false;
      state.isSuccess = false;
      state.message = "failed";
    },
  },
});

export default clientSlice;
