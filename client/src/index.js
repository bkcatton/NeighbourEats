import * as React from "react";
import * as ReactDOM from "react-dom";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import "./index.css";
import App from "./App";
import Dish from "./Components/Dish";

ReactDOM.render(
  <React.StrictMode>
  <BrowserRouter>
      <Routes>
        <Route path="browse" element={<App />} />
        <Route path="browse/:id" element={<Dish />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);


