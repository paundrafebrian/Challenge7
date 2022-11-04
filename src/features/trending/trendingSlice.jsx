import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { useParams } from "react-router-dom";

const initialState = {
  entities: [],
  loading: false,
};

export const getTrending = createAsyncThunk(
  "trending/getTrending",
  async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/movie/popular`,
        {
          params: {
            api_key: process.env.REACT_APP_TMDB_KEY,
          },
        }
      );
      console.log(res);
      return res.data.results;
    } catch (error) {
      console.log("error");
    }
  }
);

export const trendingSlice = createSlice({
  name: "trending",
  initialState,
  reducers: {},
  extraReducers: {
    [getTrending.pending]: (state) => {
      state.loading = true;
    },
    [getTrending.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.entities = payload;
    },
    [getTrending.rejected]: (state) => {
      state.loading = false;
    },
  },
});

export const trendingReducer = trendingSlice.reducer;
