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
  const [isVendor, setIsVendor] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const [userId, setUserId] = useState('');

  // CONTEXT
  const user = useContext(UserContext)

  useEffect(() => {
    const fetchData = async () => {
      const userId = localStorage.getItem('userId');
      if (userId) {
        setIsAuth(true);
        try {
          const { data } = await axiosConfig.get(`/users/${userId}`);
          if (data.length) {
            setIsVendor(true);
          }
        } catch (error) {
          console.log(error);
        }
      }
    }
    fetchData();
  }, [isAuth]);

  const setLoggedInUser = e => {
    e.preventDefault();

    setIsAuth(true);
    localStorage.setItem('userId', userId);
  };

  const handleLogout = () => {
    setIsAuth(false);
    localStorage.clear();
  };

  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Browse</Link>
        {isAuth ? (
          <Fragment>
            <Link to="/orders/buyer">Order</Link>
            <Link to="/orders/history">Orders History</Link>
            {/* this is for buyers -
            will show all confirmed orders - leave review from here */}
            {isVendor && <Link to="/orders/vendor">Current Orders</Link>}
            {/* for vendors only -
            will display all orders that have been confirmed */}
            <Link to="/dishes/new">New Dishes</Link>
            <button onClick={handleLogout}>Log out</button>
          </Fragment>
        ) : (
          <form onSubmit={e => setLoggedInUser(e)}>
            <input
              type="text"
              placeholder="login here"
              value={userId}
              onChange={e => setUserId(e.target.value)}
            />
            <button type="submit"> login </button>
          </form>
        )}
      </nav>
      <Routes>
        <Route path="/" element={<Browse />} />
        {isAuth && <Route path="/orders/buyer" element={<BuyerOrders />} />}
        {isAuth && <Route path="/orders/history" element={<OrdersHistory />} />}
        {isAuth && isVendor && (
          <Route path="/orders/vendor" element={<VendorOrders />} />
        )}
        {isAuth && <Route path="/dishes/details/:id" element={<Dish />} />}
        {isAuth && <Route path="/dishes/new" element={<NewDish />} />}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
