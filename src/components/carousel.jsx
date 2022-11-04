import Carousel from "react-bootstrap/Carousel";
import Button from "react-bootstrap/Button";
import "./compo.css";

import { AiOutlinePlayCircle } from "react-icons/ai";

function UncontrolledExample(props) {
  return (
    <div className="caro">
      <Carousel>
        <Carousel.Item>
          <img
            className=" saturate-50   "
            src={`https://image.tmdb.org/t/p/original/o5Uy3zM1SNxzoMwy5H04GQAmfNF.jpg`}
            alt="First slide"
          />
          <Carousel.Caption>
            <h1 className="text-left">Blonde</h1>
            <p className="caro text-left">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dicta
              voluptates quaerat placeat quibusdam ducimus, ad quae accusamus
              unde recusandae consectetur.
            </p>
            <a
              href="https://www.youtube.com/watch?v=4VH5-b2wwB0"
              target="blank"
            >
              {" "}
              <Button variant="danger ">
                <span className="flex items-center gap-x-3">
                  <AiOutlinePlayCircle /> WATCH TRAILER
                </span>
              </Button>
            </a>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className=" saturate-50"
            src={`https://image.tmdb.org/t/p/original/jauI01vUIkPA0xVsamGj0Gs1nNL.jpg`}
            alt="First slide"
          />
          <Carousel.Caption>
            <h1 className="font-sans text-left">Jurassic World Dominion</h1>
            <p className="caro text-left">
              {" "}
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis
              magni quod hic ipsum dolorem rem numquam incidunt, libero labore
              quas.{" "}
            </p>
            <a
              href="https://www.youtube.com/watch?v=fb5ELWi-ekk"
              target="blank"
            >
              <Button variant="danger ">
                <span className="flex items-center gap-x-3">
                  <AiOutlinePlayCircle /> WATCH TRAILER
                </span>
              </Button>
            </a>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <img
            className=" saturate-50"
            src={`https://image.tmdb.org/t/p/original/dxihDyyA6RSAtLZog4l1MYdDqLD.jpg`}
            alt="First slide"
          />
          <Carousel.Caption>
            <h1 className="text-left">Vesper</h1>
            <p className="caro text-left">
              {" "}
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam
              minima debitis iure error vel, ea neque inventore odit
              reprehenderit omnis.{" "}
            </p>
            <a
              href="https://www.youtube.com/watch?v=9dajBhMSd00"
              target="blank"
            >
              <Button variant="danger ">
                <span className="flex items-center gap-x-3">
                  <AiOutlinePlayCircle /> WATCH TRAILER
                </span>
              </Button>
            </a>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
}

export default UncontrolledExample;
