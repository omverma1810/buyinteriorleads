import React, { createContext, useState, useEffect, useContext } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [userId, setUserId] = useState(null);
  const [accessToken, setAccessToken] = useState(null);


  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    const storedAccessToken = localStorage.getItem("accessToken");

    if (storedUserId && storedAccessToken) {
      setUserId(storedUserId);
      setAccessToken(storedAccessToken);
    }
  }, []);


  const login = (userId, accessToken) => {
    setUserId(userId);
    setAccessToken(accessToken);
    localStorage.setItem("userId", userId);
    localStorage.setItem("accessToken", accessToken);
  };

  // Logout function
  const logout = () => {
    setUserId(null);
    setAccessToken(null);
    localStorage.removeItem("userId");
    localStorage.removeItem("accessToken");
  };

  return (
    <AuthContext.Provider value={{ userId, accessToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};


export const useAuth = () => {
  return useContext(AuthContext);
};
