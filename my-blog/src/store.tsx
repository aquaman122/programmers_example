import { configureStore, createSlice } from "@reduxjs/toolkit";

const users = createSlice({
  name : "user",
  initialState: "jang",
  reducers: {}
})

export default configureStore ({
  reducer : {
    users : users.reducer
  }
});
