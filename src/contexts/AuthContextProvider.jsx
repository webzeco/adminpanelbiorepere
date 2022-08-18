import React, { useEffect, useState } from 'react';
import { getMe } from '../api/users';
import useApi from '../hooks/useApi';

export const AuthContext = React.createContext();

export default function AuthContextProvider({ children }) {
  const getMeApi = useApi(getMe);

  const loadUserHandler = async () => {
    if (localStorage.getItem('jwt') !== undefined) {
      const result = await getMeApi.request();
      if (!getMeApi.error) {
        console.log('data', result.data);
        setUser(result.data);
      }
    }
  };

  const [user, setUser] = useState();
  useEffect(() => {
    loadUserHandler();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}
