import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  entities: [],
  loading: false,
};

export const getMoviesDetail = createAsyncThunk(
  "detail/getDetail",
  async (id = false) => {
    const API_KEY = "97caff1504fb5f9037e7c577be630b77";
    try {
      const res = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`
      );
      console.log(res.data);
      return res.data;
    } catch (error) {
      console.log("error");
    }
  }
);

export const detailSlice = createSlice({
  name: "detail",
  initialState,
  reducers: {},
  extraReducers: {
    [getMoviesDetail.pending]: (state) => {
      state.loading = true;
    },
    [getMoviesDetail.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.entities = payload;
    },
    [getMoviesDetail.rejected]: (state) => {
      state.loading = false;
    },
  },
});

export const detailReducer = detailSlice.reducer;
