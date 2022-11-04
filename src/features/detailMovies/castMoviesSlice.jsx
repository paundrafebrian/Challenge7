import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
  credits: [],
  load: false,
};

export const getMoviesCredit = createAsyncThunk(
  "cast/getCast",
  async (id = false) => {
    const API_KEY = "97caff1504fb5f9037e7c577be630b77";
    try {
      const res = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}`
      );
      console.log(res.data.cast);
      return res.data.cast.slice(0, 4);
    } catch (error) {
      console.log("error");
    }
  }
);
export const castSlice = createSlice({
  name: "cast",
  initialState,
  reducers: {},
  extraReducers: {
    [getMoviesCredit.pending]: (state) => {
      state.load = true;
    },
    [getMoviesCredit.fulfilled]: (state, { payload }) => {
      state.load = false;
      state.credit = payload;
    },
    [getMoviesCredit.rejected]: (state) => {
      state.load = false;
    },
  },
});
export const castReducer = castSlice.reducer;
