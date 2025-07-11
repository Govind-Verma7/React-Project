import { configureStore } from "@reduxjs/toolkit";
import  userDetail  from "../features/userDetailSlice";
import  userLogInDetail  from "../features/userLogInSlice";

export const store = configureStore({
    reducer: {
        signUp: userDetail,
        logIn: userLogInDetail
    },
  })

  export type RootState = ReturnType<typeof store.getState>
  export type AppDispatch = typeof store.dispatch