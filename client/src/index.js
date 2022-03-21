import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import './index.css';
import App from './App';
import UserProvider from './Components/UserProvider';

// (async () => {
// const { publishableKey } = await fetch('/config').then(r => r.json());

// @function  UserContext
// const UserContext = React.createContext({ name: '', auth: false });

// // @function  UserProvider
// // Create function to provide UserContext
// const UserProvider = ({ children }) => {
//   const [user, setUser] = React.useState({ name: '', auth: false });

//   const login = (name) => {
//     setUser((user) => ({
//       name: name,
//       auth: true,
//     }));
//   };

//   const logout = () => {
//     setUser((user) => ({
//       name: '',
//       auth: false,
//     }));
//   };

//   return (
//     <UserContext.Provider value={{ user, login, logout }}>
//       {children}
//     </UserContext.Provider>
//   );
// };

// // @function  UnauthApp
// function UnauthApp() {
//   const { login } = React.useContext(UserContext);
//   const [name, setName] = React.useState();

//   return (
//     <>
//       <h1>Please, log in!</h1>

//       <label>Name:</label>
//       <input
//         type="text"
//         onChange={(event) => {
//           setName(event.target.value);
//         }}
//       />
//       <button onClick={() => login(name)}>Log in</button>
//     </>
//   );
// }

// // @function  AuthApp
// function AuthApp() {
//   const { user, logout } = React.useContext(UserContext);

//   return (
//     <>
//       <h1>Hello, {user.name}!</h1>
//       <button onClick={logout}>Logout</button>
//     </>
//   );
// }





const stripePromise = loadStripe(
  `${process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY}`
);

ReactDOM.render(
  <React.StrictMode>
    <Elements stripe={stripePromise}>
      <UserProvider>
        <App />
      </UserProvider>
    </Elements>
  </React.StrictMode>,
  document.getElementById('root')
);
// })();

// import * as React from 'react';
// import * as ReactDOM from 'react-dom';

// import './index.css';
// import App from './App';

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );
