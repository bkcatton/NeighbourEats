import React, { useState, useEffect } from 'react'
import axiosConfig from '../axiosConfig';

const UserProvider = ({ children }) => {
  const [user, setUser] = useState({ userId: '', isVendor: false });
  
  
  useEffect(() => {
    function setUserId() {
      const userId = localStorage.getItem('userId')
      let isVendor = localStorage.getItem('isVendor')
      if (isVendor === 'true') {
        isVendor = true
      }

      if (userId) {
        setUser({ userId, isVendor })
      }
    }

    setUserId();
  }, [])

  const login = async (e, userId) => {
    e.preventDefault();
    localStorage.setItem('userId', userId)
    
    try {
      const { data } = await axiosConfig.get(`/users/${userId}`);
      setUser({userId: data.id, isVendor: data.is_vendor});
      localStorage.setItem('isVendor', data.is_vendor)
    } catch (error) {
      console.log(error);
    }
  }

  const logout = () => {
    localStorage.clear()
    // localStorage.clear('isVendor')
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