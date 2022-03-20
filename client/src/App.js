import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

import Browse from './Components/Browse';
import Orders from './Components/Orders';
import OrdersHistory from './Components/OrdersHistory';
import CurrentOrders from './Components/CurrentOrders';
import Reviews from './Components/Reviews';
import Dish from './Components/Dish';
import NewDish from './Components/NewDish';
import PaymentForm from './Components/PaymentForm';
import axiosConfig from './axiosConfig';

const App = () => {
  const [isVendor, setIsVendor] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const [userId, setUserId] = useState('');

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
        <Link to="/orders">Order</Link>
        <Link to="/orders/history">Orders History</Link>{' '}
        {/* this is for buyers -
        will show all confirmed orders - leave review from here */}
        {isVendor && <Link to="/orders/current">Current Orders</Link>}
        {/* for vendors only -
        will display all orders that have been confirmed */}
        <Link to="/reviews">Reviews</Link>
        <Link to="/dishes/new">New Dishes</Link>
        {!isAuth ? (
          <form onSubmit={e => setLoggedInUser(e)}>
            <input
              type="text"
              placeholder="login here"
              value={userId}
              onChange={e => setUserId(e.target.value)}
            />
            <button type="submit"> login </button>
          </form>
        ) : (
          <button onClick={handleLogout}>Log out</button>
        )}
      </nav>
      <Routes>
        <Route path="/" element={<Browse />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/orders/history" element={<OrdersHistory />} />
        {isVendor && (
          <Route path="/orders/current" element={<CurrentOrders />} />
        )}
        <Route path="/reviews" element={<Reviews />} />
        <Route path="/dishes/details/:id" element={<Dish />} />
        <Route path="/dishes/new" element={<NewDish />} />
        <Route path="/payment" element={<PaymentForm />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
