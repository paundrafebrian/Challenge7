import React, { useState, useEffect } from "react";
import Cinema from "../assets/cinema.jpg";
import axios from "axios";
import Nav from "../nav";
import Card from "react-bootstrap/Card";
import { useNavigate, useParams } from "react-router-dom";
import Footer from "../footer";

function Search(props) {
  const [search, setSearch] = useState([]);

  let { name } = useParams();

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/search/movie?api_key=b148673a01ff856c479b424ae5631a0d&query=${name}`
      )
      .then((respone) => {
        // console.log("datas => ", respone.data);
        setSearch(respone.data.results);
      });
  }, [name]);
  const navigate = useNavigate();
  return (
    <div className="search">
      <Nav />
      <div className="header">
        <img src={Cinema} alt="" className="w-screen " />
      </div>
      <div className="container">
        <h1 className="mt-12 mb-12"> Result For " {name} "</h1>
        <div className="conatiner  grid grid-cols-4 gap-5">
          {search &&
            search.map((item, index) => {
              return (
                <Card>
                  <Card.Img
                    variant="top"
                    key={index}
                    className="w-2/4"
                    src={`https://image.tmdb.org/t/p/original/${item.poster_path}`}
                    onClick={() => navigate(`/${item.id}`)}
                  />
                  <Card.Body>
                    <Card.Title>{item.title}</Card.Title>
                  </Card.Body>
                </Card>
              );
            })}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Search;
