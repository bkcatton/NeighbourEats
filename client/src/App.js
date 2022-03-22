import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Browse from './Components/Browse';
import BuyerOrders from './Components/BuyerOrders';
import PreviousOrders from './Components/PreviousOrders';
import Dish from './Components/Dish';
import NewDish from './Components/NewDish';
import VendorOrders from './Components/VendorOrders';

import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import NavBar from './Components/NavBar'

const App = () => {

  return (
    <BrowserRouter>
      <CssBaseline />
      <NavBar />
      <Container maxWidth="xl">
        <Routes>
          <Route path="/" element={<Browse />} />
          <Route path="/orders/cart" element={<BuyerOrders />} />
          <Route path="/orders/previous" element={<PreviousOrders />} />
          <Route path="/orders/vendor" element={<VendorOrders />} />
          <Route path="/dishes/details/:id" element={<Dish />} />
          <Route path="/dishes/new" element={<NewDish />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
};

export default App;
