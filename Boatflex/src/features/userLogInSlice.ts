import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

interface UserLogInData {
  client_id: string;
  client_secret: string;
  grant_type: string;
  username: string;
  password: string;
}
export const createLogInUser = createAsyncThunk(
  'logInUser',
  async (data: UserLogInData, { rejectWithValue }) => {
    try {
      const params = new URLSearchParams();
      for (const key in data) {
        params.append(key, (data as any)[key]);
      }

      const response = await axios.post(
        "/connect/token",
        params,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
        }
      );

      const token = response.data.access_token;
      const usersMap = JSON.parse(localStorage.getItem("users") || "{}");
      const userInfo = usersMap[data.username] || {};
      const firstName = userInfo.firstName || "";
      const lastName = userInfo.lastName || "";
      const PhoneNumber = userInfo.PhoneNumber || "";
      localStorage.setItem("token", token);
      localStorage.setItem("username", data.username);
      localStorage.setItem("fName", firstName);
      localStorage.setItem("lName", lastName);
      localStorage.setItem("pNumber", PhoneNumber);
      alert("Login Successful");
      return {
        token,
        username: data.username,
        firstName,
        lastName,
        PhoneNumber,
      };
    } catch (error: any) {
      alert("Login Failed");
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data);
      }
      return rejectWithValue(error.message);
    }
  }
);
const tokenFromStorage = localStorage.getItem("token");
const usernameFromStorage = localStorage.getItem("username");
const fNameFromStorage = localStorage.getItem("fName");
const lNameFromStorage = localStorage.getItem("lName");
const pNumberFromStorage = localStorage.getItem("pNumber");

interface UserLogInState {
  users: UserLogInData[];
  loading: boolean;
  error: any;
  token: string | null;
  isAuthenticated: boolean
  username: string | null;
  fName: string | null;
  lName: string | null;
  pNumber: string | null;
}
const initialState: UserLogInState = {
  users: [],
  loading: false,
  error: null,
  token: tokenFromStorage,
  isAuthenticated: !!tokenFromStorage,
  username: usernameFromStorage,
  fName: fNameFromStorage,
  lName: lNameFromStorage,
  pNumber: pNumberFromStorage,
};
export const userLogInDetail = createSlice({
  name: "userLogInDetail",
  initialState,
  reducers: {
    logout: (state) => {
      state.token = null;
      state.isAuthenticated = false;
      state.username = null;
      state.fName = null;
      state.lName = null;
      state.pNumber = null;
      state.error = null;
      localStorage.removeItem("token");
      localStorage.removeItem("username");
      localStorage.removeItem("fName");
      localStorage.removeItem("lName");
      localStorage.removeItem("pNumber");
    },
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createLogInUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(createLogInUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.username = action.payload.username;
        state.fName = action.payload.firstName;
        state.lName = action.payload.lastName;
        state.pNumber = action.payload.PhoneNumber;
        state.error = null;
      })  
      .addCase(createLogInUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
      });
  }
});
export default userLogInDetail.reducer;
export const { logout, clearError } = userLogInDetail.actions;