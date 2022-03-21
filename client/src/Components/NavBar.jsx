import React, { Fragment, useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from './UserProvider';

const NavBar = () => {
  const { user, login, logout } = useContext(UserContext);
  const { userId } = user;
  const [input, setInput] = useState('');
  return (
    <nav>
      <Link to="/">Browse</Link>
      {userId ? (
        <Fragment>
          <Link to="/orders/cart">My Cart</Link>
          <Link to="/orders/previous">Previous Orders</Link>
          <Link to="/orders/vendor">Current Orders</Link>
          <Link to="/dishes/new">New Dishes</Link>
          <button onClick={logout}>Log out</button>
        </Fragment>
      ) : (
        <form onSubmit={e => login(e, input)}>
          <input
            type="text"
            placeholder="login here"
            value={input}
            onChange={e => setInput(e.target.value)}
          />
          <button type="submit"> login </button>
        </form>
      )}
    </nav>
  );
};

export default NavBar;
