import { configureStore } from "@reduxjs/toolkit";
import { castReducer } from "../features/detailMovies/castMoviesSlice";
import { detailReducer } from "../features/detailMovies/detailMoviesSlice";
import { trendingReducer } from "../features/trending/trendingSlice";

export const store = configureStore({
  reducer: {
    trending: trendingReducer,
    detail: detailReducer,
    cast: castReducer,
  },
});
