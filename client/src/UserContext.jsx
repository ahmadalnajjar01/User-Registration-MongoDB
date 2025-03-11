import React, { createContext, useState, useEffect } from "react";
import { getUserId } from "./services/api";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    async function fetchUser() {
      const id = await getUserId();
      setUserId(id);
    }
    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ userId, setUserId }}>
      {children}
    </UserContext.Provider>
  );
};
