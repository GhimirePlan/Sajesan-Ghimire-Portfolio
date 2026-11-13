import { useState } from 'react';

export const useAuth = () => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('userInfo');
    try {
      return savedUser ? JSON.parse(savedUser) : null;
    } catch {
      localStorage.removeItem('userInfo');
      return null;
    }
  });

  const login = (userInfo: any) => {
    localStorage.setItem('userInfo', JSON.stringify(userInfo));
    setUser(userInfo);
  };

  const logout = () => {
    localStorage.removeItem('userInfo');
    setUser(null);
  };

  return { user, login, logout, isAdmin: user?.isAdmin };
};
