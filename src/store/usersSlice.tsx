import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface IUser {
  token?: string | null;
  _id?: string;
  username: string;
  email: string;
  password: string;
  fullName: string;
  createdAt?: string;
  updatedAt?: string;
}

const initialState: IUser[] = [];

export const usersSlice = createSlice({
  name: "usersData",
  initialState,
  reducers: {
    setUsersData: (_state, action: PayloadAction<IUser[]>) => {
      return action.payload;
    },
    adduserToSlice: (state, action: PayloadAction<IUser>) => {
      state.push(action.payload);
    },
    deleteUserToSlice: (state, action: PayloadAction<string>) => {
      return state.filter((user) => user._id !== action.payload);
    },
    editUserToSlice: (state, action: PayloadAction<IUser>) => {
      return state.map((user) =>
        user._id === action.payload._id ? action.payload : user
      );
    },
  },
});

export const {
  setUsersData,
  adduserToSlice,
  deleteUserToSlice,
  editUserToSlice,
} = usersSlice.actions;

export default usersSlice.reducer;
