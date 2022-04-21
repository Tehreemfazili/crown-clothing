import { createContext, useState } from "react";

// as the actual value you want to access
export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null,
});

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const value = { currentUser, setCurrentUser };

  return (
    <UserContext.Provider value={value}> {children} </UserContext.Provider>
    // this provider wraps the app which needs to acces the user data
    // the childern will access the value that we passed in the parameter
  );
};
