import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface IClient {
  token: string | null;
  _id: string;
  username: string;
  email: string;
  password: string;
  fullName: string;
  createdAt: string;
  updatedAt: string;
}

const initialState: IClient = {
    token: null,
    _id: "",
    username: "",
    email: "",
    password: "",
    fullName: "",
    createdAt: "",
    updatedAt: "",
};

export const clientSlice = createSlice({
  name: "clientData",
  initialState,
  reducers: {
    setClientData: (state, action: PayloadAction<IClient>) => {     
      return { ...state, ...action.payload };
    },
    setClientToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    }
  },
});

export const { setClientToken, setClientData } = clientSlice.actions;

export default clientSlice.reducer;
