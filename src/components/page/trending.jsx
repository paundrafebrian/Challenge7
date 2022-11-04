import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BsArrowRight } from "react-icons/bs";
import "swiper/css";
import "swiper/css/pagination";
import { useDispatch, useSelector } from "react-redux";
import { getTrending } from "../../features/trending/trendingSlice";

function Trending() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { entities, loading } = useSelector((state) => state.trending);
  useEffect(() => {
    dispatch(getTrending());
  }, []);
  if (loading) return <p>loading..</p>;
  return (
    <div>
      <div className="trending container flex place-content-between mt-20">
        <h2 className=" items-start">Trending Movies</h2>
        <div className="flex items-center flex-wrap gap-x-4 text-rose-700 cursor-pointer">
          <h1 className="text-xl">See All Movies</h1>
          <span className="text-md">
            <BsArrowRight />
          </span>
        </div>
      </div>
      <Swiper
        slidesPerView={4}
        spaceBetween={30}
        className="mySwiper h-3/4 container mt-12"
      >
        {entities &&
          entities.map((result) => {
            return (
              <SwiperSlide>
                <img
                  key={result.id}
                  className="h-3/4 rounded-xl"
                  src={`https://image.tmdb.org/t/p/original/${result.poster_path}`}
                  alt=""
                  onClick={() => navigate(`${result.id}`)}
                />
              </SwiperSlide>
            );
          })}
      </Swiper>
    </div>
  );
}

export default Trending;
