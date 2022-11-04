import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./App.css";
import App from "./App";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "swiper/css/bundle";
import "bootstrap/dist/css/bootstrap.min.css";
import Details from "./components/page/detail";
import Search from "./components/page/search";



import { GoogleOAuthProvider } from "@react-oauth/google";
import { Provider } from "react-redux";
import { store } from "./app/store";
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <GoogleOAuthProvider clientId="645966915155-p4r24d780idt69lg5rdf7ptbj80alnra.apps.googleusercontent.com">
        <BrowserRouter>
          <Routes>
            <Route>
              <Route path="/" element={<App />} />
              <Route path="/:id" element={<Details />} />
              <Route path="/search/:name" element={<Search />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </GoogleOAuthProvider>
    </Provider>
  </React.StrictMode>
);

