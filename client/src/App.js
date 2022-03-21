import React, { Fragment, useState, useEffect, useContext } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

import axiosConfig from './axiosConfig';
import Browse from './Components/Browse';
import BuyerOrders from './Components/BuyerOrders';
import OrdersHistory from './Components/OrdersHistory';
import Dish from './Components/Dish';
import NewDish from './Components/NewDish';
import VendorOrders from "./Components/VendorOrders"
import { UserContext } from './Components/UserProvider';

const App = () => {
  const {user, login, logout} = useContext(UserContext);
  const { userId } = user;
  const [input, setInput] = useState('');

  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Browse</Link>
          {userId ? <Fragment>
            <Link to="/orders/buyer">Order</Link>
            <Link to="/orders/history">Orders History</Link>
            {/* this is for buyers -
            will show all confirmed orders - leave review from here */}
            <Link to="/orders/vendor">Current Orders</Link>
            {/* for vendors only -
            will display all orders that have been confirmed */}
            <Link to="/dishes/new">New Dishes</Link>
            <button onClick={logout}>Log out</button>
          </Fragment>
            :
          <form onSubmit={(e) => login(e, input)}>
            <input
              type="text"
              placeholder="login here"
              value={input}
              onChange={e => setInput(e.target.value)}
            />
            <button type="submit"> login </button>
          </form>
          }
      </nav>
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
