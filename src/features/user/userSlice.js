import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  is_logged_in: false,
  fetch_status: "idle",
  error: null,
  user_id: null,
  username: "Anonymous user",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetch_login_status.pending, (state, action) => {
        state.fetch_status = "pending";
        console.log("Fetching user login status");
      })
      .addCase(fetch_login_status.fulfilled, (state, action) => {
        const data = action.payload;
        state.fetch_status = "fullfilled";
        if (data.statusCode === 200) {
          state.user_id = data.user_id;
          state.username = data.username;
          state.is_logged_in = true;
        } else {
          state.error = "Failed to login!";
        }
      })
      .addCase(logout_user.fulfilled, (state, action) => {
        const data = action.payload;
        if (data.statusCode === 200) {
          // successfull logout
          state.user_id = null;
          state.username = "Anonymous user";
          state.is_logged_in = false;
        } else {
          state.error = "Failed to login!";
        }
      })
      .addCase(login_user.fulfilled, (state, action) => {
        const data = action.payload;
        if (data.statusCode === 200) {
          // successfull logout
          state.user_id = data.user_id;
          state.username = data.username;
          state.is_logged_in = true;
        } else {
          state.error = "Failed to login!";
        }
      })
      .addCase(signup_user.fulfilled, (state, action) => {
        const data = action.payload;
        if (data.statusCode === 200) {
          // successfull signup
        } else {
          state.error = "Failed to signup!";
        }
      });
  },
});

export const fetch_login_status = createAsyncThunk(
  "user/fetch_login_status",
  async () => {
    const response = await axios({
      method: "GET",
      url: "http://localhost:3000/accounts/is_logged_in",
      withCredentials: true,
    });
    const data = response.data;
    return data;
  }
);

export const logout_user = createAsyncThunk("user/logout_user", async () => {
  const response = await axios({
    method: "POST",
    url: "http://localhost:3000/accounts/logout",
    withCredentials: true,
  });
  return response.data;
});

export const login_user = createAsyncThunk(
  "user/login_user",
  async (form_data) => {
    console.log(form_data);
    const response = await axios({
      method: "POST",
      url: "http://localhost:3000/accounts/login",
      withCredentials: true,
      data: form_data,
      headers: {
        "Content-Type": "application/json", // Adjust content type as needed
      },
    });
    return response.data;
  }
);

export const signup_user = createAsyncThunk(
  "user/signup_user",
  async (form_data) => {
    console.log(form_data);
    const response = await axios({
      method: "POST",
      url: "http://localhost:3000/accounts/signup",
      withCredentials: true,
      data: form_data,
      headers: {
        "Content-Type": "application/json", // Adjust content type as needed
      },
    });
    return response.data;
  }
);

export const select_user_status = (state) => state.user;

export default userSlice.reducer;
