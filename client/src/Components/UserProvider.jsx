import React, { useState, useEffect } from 'react'
import axiosConfig from '../axiosConfig';

const UserProvider = ({ children }) => {
  const [user, setUser] = useState({ userId: '', isVendor: false });
  
  useEffect(() => {
    function cleanUp() {
      const userId = localStorage.getItem('userId')
      if (userId) setUser({ userId: userId, isVendor: true })
    }
    cleanUp();
  }, [])

  const login = async (e, input) => {
    e.preventDefault();
    localStorage.setItem('userId', input)
    
    try {
      const { data } = await axiosConfig.get(`/users/${input}`);
      console.log("this is after the post request", data)
      // const {id, isVendor} = data
      setUser({userId: data.id, isVendor: data.is_vendor});
    } catch (error) {
      console.log(error);
    }
  }

  const logout = () => {
    setUser(() => ({
      userId: '',
      isVendor: false,
    }));
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserProvider
export const UserContext = React.createContext({ userId: '', isVendor: false });