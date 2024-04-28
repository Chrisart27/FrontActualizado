import { createSlice } from "@reduxjs/toolkit";

const clientSlice = createSlice({
  name: "client",
  initialState: {
    client: null,
    usersOnline: [],
  },
  reducers: {
    login: (state, action) => {
      console.log(action.payload);
      state.client = action.payload;
    },
    setOnlineUsers: (state, action) => {
      state.usersOnline = action.payload;
    },
  },
});

export default clientSlice.reducer;
export const { login, setOnlineUsers } = clientSlice.actions;
