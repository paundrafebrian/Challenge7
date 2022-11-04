import React from "react";
import Nav from "./components/nav";
import Carousel from "./components/carousel";
import Trending from "./components/page/trending";
import Footer from "./components/footer";


function App() {
  return (
    <div className="App">
      <Nav />
      <Carousel />
      <Trending />
      <Footer />
    </div>
  );
}
export default App;
