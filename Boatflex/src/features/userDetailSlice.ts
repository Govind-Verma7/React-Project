import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface UserFormData {
  Email: string;
  Password: string;
  agreeForPrivacyPolicy: boolean;
  agreeForMarketingPermissions: boolean;
  firstName: string;
  lastName: string;
  CountryCode: string;
  PhoneNumber: string;
  referralUserId: number;
}

export const createUser = createAsyncThunk(
  'createUser',
  async (data: UserFormData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "/api/signup",
        data,
        {
          headers: {
            "Content-Type": "application/json"
          },
        }
      );
      alert("Successful");
      return response.data;
    } catch (error: any) {
      alert("Failed");
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data);
      }
      return rejectWithValue(error.message);
    }
  }
);
const storeFName = localStorage.getItem("fName");
const storeLName = localStorage.getItem("lName");
const storedSignInFlag = localStorage.getItem("isSignInUser") === "true";
const storedEmail = localStorage.getItem("eMail");
const storePNumber = localStorage.getItem("pNumber");


interface UserState {
  users: UserFormData[];
  loading: boolean;
  error: any;
  fName: null | string;
  isSignInUser: boolean;
  eMail: string | null;
  lName: null | string;
  pNumber: string | null;
}

const initialState: UserState = {
  users: [],
  loading: false,
  error: null,
  fName: storeFName,
  isSignInUser: storedSignInFlag,
  eMail: storedEmail,
  lName: storeLName,
  pNumber: storePNumber,
};

export const userDetail = createSlice({
  name: "userDetail",
  initialState,
  reducers: {
    logout2: (state) => {
      state.fName = null;
      state.isSignInUser = false;
      state.eMail = null;
      state.lName = null;
      state.pNumber = null;
      state.error = null;
      localStorage.removeItem("fName");
      localStorage.removeItem("isSignInUser");
      localStorage.removeItem("eMail");
      localStorage.removeItem("lName");
      localStorage.removeItem("pNumber");
    },
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users.push(action.payload);
        state.fName = action.meta.arg.firstName;
        state.isSignInUser = true;
        state.eMail = action.meta.arg.Email;
        state.lName = action.meta.arg.lastName;
        state.pNumber = action.meta.arg.PhoneNumber;
        state.error = null;

        localStorage.setItem("fName", action.meta.arg.firstName);
        localStorage.setItem("isSignInUser", "true");
        localStorage.setItem("eMail", action.meta.arg.Email);
        localStorage.setItem("lName", action.meta.arg.lastName);
        localStorage.setItem("pNumber",action.meta.arg.PhoneNumber);

        const existingUsers = JSON.parse(localStorage.getItem("users") || "{}");
        existingUsers[action.meta.arg.Email] = {
          firstName: action.meta.arg.firstName,
          lastName: action.meta.arg.lastName,
          PhoneNumber: action.meta.arg.PhoneNumber,
        };
        localStorage.setItem("users", JSON.stringify(existingUsers));

      })
      .addCase(createUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isSignInUser = false;
      });
  }
});

export default userDetail.reducer;
export const { logout2, clearError } = userDetail.actions;
