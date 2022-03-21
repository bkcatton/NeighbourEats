import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Browse from './Components/Browse';
import BuyerOrders from './Components/BuyerOrders';
import OrdersHistory from './Components/OrdersHistory';
import Dish from './Components/Dish';
import NewDish from './Components/NewDish';
import VendorOrders from './Components/VendorOrders';
import NavBar from './Components/NavBar';

const App = () => {

  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Browse />} />
        <Route path="/orders/buyer" element={<BuyerOrders />} />
        <Route path="/orders/history" element={<OrdersHistory />} />
        <Route path="/orders/vendor" element={<VendorOrders />} />
        <Route path="/dishes/details/:id" element={<Dish />} />
        <Route path="/dishes/new" element={<NewDish />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
