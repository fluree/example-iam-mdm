import React, { useState } from "react";
import { useHistory } from "react-router-dom";

export const UserContext = React.createContext();

export default function UserInfo(props) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState("");

  const history = useHistory();

  const logout = (key) => {
    localStorage.removeItem(key);
    setLoggedIn(false);
    setInfo("");
    history.push("/login");
  };

  const login = () => {
    setLoggedIn(true);
  };

  const setInfo = (username) => {
    setUser(username);
  };

  return (
    <UserContext.Provider value={{ loggedIn, user, logout, login, setInfo }}>
      {props.children}
    </UserContext.Provider>
  );
}
