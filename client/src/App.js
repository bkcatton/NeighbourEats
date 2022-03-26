import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Browse from "./Components/Browse";
import Cart from "./Components/Cart";
import PreviousOrders from "./Components/PreviousOrders";
import NewDish from "./Components/NewDish";
import VendorOrders from "./Components/VendorOrders";

import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import NavBar from "./Components/NavBar";

const App = () => {
  return (
    <BrowserRouter>
      <CssBaseline />
      <Box backgroundColor="secondary.main" minHeight="100vh">
        <NavBar />
        <Container maxWidth="xl">
          <Routes>
            <Route path="/" element={<Browse />} />
            <Route path="/orders/cart" element={<Cart />} />
            <Route path="/orders/previous" element={<PreviousOrders />} />
            <Route path="/orders/vendor" element={<VendorOrders />} />
            <Route path="/dishes/new" element={<NewDish />} />
          </Routes>
        </Container>
      </Box>
    </BrowserRouter>
  );
};

export default App;
