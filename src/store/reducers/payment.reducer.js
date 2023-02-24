import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { setMessage } from "./message";
import PaymentGateway from "../actions/payment.action";

export const getPaymentByUserId = createAsyncThunk(
  "payment/getPaymentByUserId",
  async (thunkAPI) => {
    try {
      const response = await PaymentGateway.getPaymentByUserId();
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

export const addPayment = createAsyncThunk(
  "payment/addPayment",
  async (paymentData, thunkAPI) => {
    try {
      const response = await PaymentGateway.addPayment(paymentData);
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

const userSlice = createSlice({
  name: "paymentGateway",
  initialState: {
    data: [],
    loading: false,
    isSuccess: false,
    message: "",
  },
  reducers: {},
  extraReducers: {
    [addPayment.pending]: (state) => {
      state.loading = true;
    },
    [addPayment.fulfilled]: (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.isSuccess = true;
    },
    [addPayment.rejected]: (state, action) => {
      state.loading = false;
      state.isSuccess = false;
      state.message = "failed";
    },
    [getPaymentByUserId.pending]: (state) => {
      state.loading = true;
    },
    [getPaymentByUserId.fulfilled]: (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.isSuccess = true;
    },
    [getPaymentByUserId.rejected]: (state, action) => {
      state.loading = false;
      state.isSuccess = false;
      state.message = "failed";
    },
  },
});

export default userSlice;
