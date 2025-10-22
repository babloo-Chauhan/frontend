"use client";

import { createContext, useContext, useState } from "react";


const ApiContext = createContext();

export const ApiProvider = ({ children }) => {
  const [usertoken, setusertoken] = useState();
  // Global states


  return (
    <ApiContext.Provider
      value={{
      usertoken,setusertoken
      }}
    >
      {children}
    </ApiContext.Provider>
  );
};

// Hook
export const useApi = () => useContext(ApiContext);
