import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const registerUser = createAsyncThunk("note/register", async (user) => {
  const response = await axios.post(
    "http://localhost:5000/api/useraccount/register",
    user
  );
  return response.data;
});

// const Register_req = "register_request";
// const Register_suc = "register_success";
// const Register_fail = "register_failure";

const noteSlice = createSlice({
  name: "note",
  initialState: {
    loading: false,
    successfully: false,
    error: null,
    message: "register",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = "loading";
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.successfully = "succeeded";
        state.error = null;
        state.message = action.payload.message;
      })
      .addCase(registerUser.rejected, (state) => {
        state.error = "failed";
      });
  },
  //   initialState: {
  //     loading: false,
  //     error: null,
  //     success: false,
  //
  //   },
  //   reducers: {
  //     logout: (state) => {
  //       state.user = null;
  //     },
  //   },
  //   extraReducers: (builder) => {
  //     builder.addCase();
  //   },
});

// const RegisterReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case "Register_req":
//       return { ...state, loading: true, error: null, success: false };
//     case "Register_suc":
//       return { ...state, loading: false, error: null, success: true };
//     case "Register_fail":
//       return {
//         ...state,
//         loading: false,
//         success: false,
//         error: action.error.message,
//       };
//   }
// };
export default noteSlice.reducer;
