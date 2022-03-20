import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

import Browse from './Components/Browse';
import Orders from './Components/Orders';
import OrdersHistory from './Components/OrdersHistory';
import CurrentOrders from './Components/CurrentOrders';
import Reviews from './Components/Reviews';
import Dish from './Components/Dish';
import NewDish from './Components/NewDish';

const App = () => {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Browse</Link>
        <Link to="/orders">Order</Link>
        <Link to="/orders/history">Orders History</Link>
        <Link to="/orders/current">Current Orders</Link>
        <Link to="/reviews">Reviews</Link>
        <Link to="/dishes/new">New Dishes</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Browse />} />
        <Route path="orders" element={<Orders />} />
        <Route path="orders/history" element={<OrdersHistory />} />
        <Route path="orders/current" element={<CurrentOrders />} />
        <Route path="reviews" element={<Reviews />} />
        <Route path="dishes/details/:id" element={<Dish />} />
        <Route path="dishes/new" element={<NewDish />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
