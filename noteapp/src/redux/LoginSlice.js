import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const LoginUser = createAsyncThunk(
  "auth/login", // ✅ keep consistent with slice name
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/useraccount/login-account",
        { email, password },
        { withCredentials: true }
      );
      return response.data; // must contain { msg, user, token }
    } catch (error) {
      // if (error.response && error.response.data) {
      //   return rejectWithValue(error.response.data);
      // }
      return rejectWithValue({ msg: "Something went wrong" });
    }
  }
);
// ✅ Check auth thunk (for page refresh)
export const checkAuth = createAsyncThunk(
  "auth/checkAuth",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/useraccount/check-auth",
        { withCredentials: true }
      );
      return response.data; // { user, message }
    } catch (error) {
      return rejectWithValue({ msg: "Not authenticated" });
    }
  }
);

const LoginSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    token: null,
    isActive: false,
    status: "idle", // idle | loading | succeeded | failed
    error: null,
    message: null,
  },
  reducers: {
    Userlogout: (state) => {
      state.user = null;
      state.token = null;
      state.isActive = false;
      state.status = "idle";
      state.error = null;
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(LoginUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(LoginUser.fulfilled, (state, action) => {
        console.log("Login payload:", action.payload);
        state.status = "succeeded";
        state.error = null;
        state.message = action.payload.msg || "Login successful";
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isActive = true;
      })
      .addCase(LoginUser.rejected, (state, action) => {
        state.status = "failed";
        state.error =
          action.payload?.message || action.error?.message || "Login failed";
        state.isActive = false;
      })
      // CheckAuth cases
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isActive = true;
      })
      .addCase(checkAuth.rejected, (state) => {
        state.user = null;
        state.isActive = false;
      });
  },
});

export const { Userlogout } = LoginSlice.actions;
export default LoginSlice.reducer;
