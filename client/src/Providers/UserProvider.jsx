import React, { useState, useEffect, useNavigate } from 'react'
import axiosConfig from '../axiosConfig';

const UserProvider = ({ children }) => {
  const [user, setUser] = useState({ userId: '', name: '', isVendor: false, avatar: '', vendorMode: false });
  const [vendorMode, setVendorMode] = useState(localStorage.getItem('vendorMode'))
  
  
  useEffect(() => {
    function setUserId() {
      const userId = localStorage.getItem('userId')
      const name = localStorage.getItem('name')
      const avatar = localStorage.getItem('avatar')
      let isVendor = localStorage.getItem('isVendor')
      let vendorMode = localStorage.getItem('vendorMode')
      if (isVendor === 'true') {
        isVendor = true
        
      }

      if (vendorMode === 'true') {
        vendorMode = true
        setVendorMode(vendorMode)
      }

      if (vendorMode === 'false') {
        vendorMode = false
        setVendorMode(vendorMode)
      }


      if (userId) {
        setUser({ userId, name, isVendor, avatar, vendorMode })
      }
    }

    setUserId();
  }, [])

  const login = async (e, userId) => {
    e.preventDefault();
    localStorage.setItem('userId', userId)

    try {
      const { data } = await axiosConfig.get(`/users/${userId}`);
      setUser({ userId: data.id, name: data.full_name, isVendor: data.is_vendor, avatar: data.avatar, vendorMode: false });
      localStorage.setItem('isVendor', data.is_vendor)
      localStorage.setItem('avatar', data.avatar)
      localStorage.setItem('name', data.full_name)
      localStorage.setItem('vendorMode', false)
    
    } catch (error) {
      console.log(error);
    }
  }

  const logout = () => {
    localStorage.clear()
    window.location.reload(false);
    window.location.href = "http://localhost:3000";

    setUser(() => ({
      userId: '',
      isVendor: false,
      avatar: '',
      vendorMode: false
    }));
  };
  
  const setVendorModeinState = () => {
    if (localStorage.getItem('vendorMode')) {
      setVendorMode(true)
    }
    if (localStorage.getItem('vendorMode') === 'false') {
      setVendorMode(false)
    }
  }

  const setVendorModeFromStorage = () => {
   (localStorage.getItem("vendorMode") === 'true') ? localStorage.setItem('vendorMode', 'false') : localStorage.setItem('vendorMode', 'true')
   setVendorModeinState();
  }

  return (
    <UserContext.Provider value={{ user, login, logout, vendorMode, setVendorModeFromStorage}} >
      {children}
    </UserContext.Provider>
  );
}

export default UserProvider
export const UserContext = React.createContext({ userId: '', name: '', isVendor: false, avatar: '', vendorMode: false});
