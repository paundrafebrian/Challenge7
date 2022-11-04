// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { AiOutlinePlayCircle, AiOutlineStar } from "react-icons/ai";
import Nav from "../nav";
import Footer from "../footer";
import Card from "react-bootstrap/Card";
import { useDispatch, useSelector } from "react-redux";
import { getMoviesDetail } from "../../features/detailMovies/detailMoviesSlice";
import { getMoviesCredit } from "../../features/detailMovies/castMoviesSlice";
const Details = () => {
  const dispatch = useDispatch();
  const { entities, loading } = useSelector((state) => state.detail);
  const { credit, load } = useSelector((state) => state.cast);
  let { id } = useParams();
  useEffect(() => {
    dispatch(getMoviesDetail(id));
    dispatch(getMoviesCredit(id));
  }, [dispatch, id]);
  if (loading && load) return <p>Loading...</p>;

  return (
    <div className="details h-screen">
      <Nav />
      <div className="content">
        {entities && (
          <div className="cont h-screen ">
            <img
              className="saturate-50  "
              key={entities.id}
              src={`https://image.tmdb.org/t/p/original/${entities.backdrop_path}`}
              alt=""
            />
            <div className="title overlay  text-white  container place-content-center pt-56  ">
              <h1>{entities.title}</h1>
              <div className="genre">
                {entities.genres &&
                  entities.genres.map((item) => {
                    return (
                      <ul className="inline-block text-md mb-7  ">
                        <li>{item.name}</li>
                      </ul>
                    );
                  })}
              </div>

              <p className=" text-md leading-loose ">{entities.overview}</p>
              <div className="rating flex flex-wrap">
                <span className="pt-1 text-lg">
                  <AiOutlineStar className="text-amber-500" />
                </span>
                <p>{Math.ceil(entities.vote_average).toFixed()}/10</p>
              </div>
              <a
                href={`https://www.youtube.com/results?search_query=${entities.title}`}
                target="blank"
              >
                <Button variant="danger ">
                  <span className="flex items-center gap-x-3">
                    <AiOutlinePlayCircle /> WATCH TRAILER
                  </span>
                </Button>
              </a>
            </div>
          </div>
        )}
      </div>

      <div className="title container mt-44">
        <h1 className="">Cast And Crew</h1>
      </div>
      <div className="actor flex flex-wrap container mt-10 place-content-between">
        {credit &&
          credit.map((item) => {
            return (
              <Card style={{ width: "18rem" }}>
                <Card.Img
                  key={item.id}
                  variant="top"
                  src={`https://image.tmdb.org/t/p/original/${item.profile_path}`}
                />
                <Card.Body>
                  <Card.Title>{item.name}</Card.Title>
                  <Card.Text>{item.character}</Card.Text>
                </Card.Body>
              </Card>
            );
          })}
      </div>
      <Footer />
    </div>
  );
};

export default Details;
