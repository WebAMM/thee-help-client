import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { setMessage } from "./message";
import CompanyProfileService from "../actions/companyProfile.action";

export const getCompanyProfileBySlug = createAsyncThunk(
  "companyProfile/getCompanyProfileBySlug",
  async (slug, thunkAPI) => {
    try {
      const response = await CompanyProfileService.getCompanyProfileBySlug(
        slug
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

export const getAllCompanies = createAsyncThunk(
  "companyProfile/getAllCompanies",
  async (thunkAPI) => {
    try {
      const response = await CompanyProfileService.getAllCompanies();
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

export const addCompanyProfileByUserId = createAsyncThunk(
  "companyProfile/addCompanyProfileByUserId",
  async (company, thunkAPI) => {
    try {
      const response = await CompanyProfileService.addCompanyProfileByUserId(
        company
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

export const updateCompanyStatusById = createAsyncThunk(
  "companyProfile/updateCompanyStatusById",
  async (company, thunkAPI) => {
    try {
      const response = await CompanyProfileService.updateCompanyStatusById(
        company
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

export const updateCompanyProfileById = createAsyncThunk(
  "companyProfile/updateCompanyProfileById",
  async (company, thunkAPI) => {
    try {
      const response = await CompanyProfileService.updateCompanyProfileById(
        company
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

export const getCompanyProfileById = createAsyncThunk(
  "companyProfile/getCompanyProfileById",
  async (company_Id, thunkAPI) => {
    try {
      const response = await CompanyProfileService.getCompanyProfileById(
        company_Id
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

export const deleteCompanyProfileById = createAsyncThunk(
  "companyProfile/deleteCompanyProfileById",
  async (company_Id, thunkAPI) => {
    try {
      const response = await CompanyProfileService.deleteCompanyProfileById(
        company_Id
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

const userSlice = createSlice({
  name: "companyProfile",
  initialState: {
    data: [],
    loading: false,
    isSuccess: false,
    message: "",
  },
  reducers: {},
  extraReducers: {
    [getCompanyProfileBySlug.pending]: (state, action) => {
      state.loading = true;
    },
    [getCompanyProfileBySlug.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.data = payload;
      state.isSuccess = true;
    },
    [getCompanyProfileBySlug.rejected]: (state, { payload }) => {
      state.loading = false;
      state.isSuccess = false;
      state.message = "failed";
    },
    [getAllCompanies.pending]: (state, action) => {
      state.loading = true;
    },
    [getAllCompanies.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.data = payload;
      state.isSuccess = true;
    },
    [getAllCompanies.rejected]: (state, { payload }) => {
      state.loading = false;
      state.isSuccess = false;
      state.message = "failed";
    },
    [addCompanyProfileByUserId.pending]: (state, action) => {
      state.loading = true;
    },
    [addCompanyProfileByUserId.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.data = payload;
      state.isSuccess = true;
    },
    [addCompanyProfileByUserId.rejected]: (state, { payload }) => {
      state.loading = false;
      state.isSuccess = false;
      state.message = "failed";
    },
    [updateCompanyStatusById.pending]: (state, action) => {
      state.loading = true;
    },
    [updateCompanyStatusById.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.data = payload;
      state.isSuccess = true;
    },
    [updateCompanyStatusById.rejected]: (state, { payload }) => {
      state.loading = false;
      state.isSuccess = false;
      state.message = "failed";
    },
    [updateCompanyProfileById.pending]: (state, action) => {
      state.loading = true;
    },
    [updateCompanyProfileById.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.data = payload;
      state.isSuccess = true;
    },
    [updateCompanyProfileById.rejected]: (state, { payload }) => {
      state.loading = false;
      state.isSuccess = false;
      state.message = "failed";
    },
    [getCompanyProfileById.pending]: (state, action) => {
      state.loading = true;
    },
    [getCompanyProfileById.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.data = payload;
      state.isSuccess = true;
    },
    [getCompanyProfileById.rejected]: (state, { payload }) => {
      state.loading = false;
      state.isSuccess = false;
      state.message = "failed";
    },
    [deleteCompanyProfileById.pending]: (state, action) => {
      state.loading = true;
    },
    [deleteCompanyProfileById.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.data = payload;
      state.isSuccess = true;
    },
    [deleteCompanyProfileById.rejected]: (state, { payload }) => {
      state.loading = false;
      state.isSuccess = false;
      state.message = "failed";
    },
  },
});

export default userSlice;
