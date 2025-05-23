import { createSlice } from "@reduxjs/toolkit";

const requestSlice = createSlice({
  name: "request",
  initialState: {
    requests: [],
    connections: [],
  },
  reducers: {
    addRequests: (state, action) => {
      state.requests = action.payload;
      return;
    },
    addConnection: (state, action) => {
      state.connections = action.payload;
      return;
    },
  },
});

export const { addRequests, addConnection } = requestSlice.actions;

export default requestSlice.reducer;
