import React, { useState } from "react";
import { useHistory } from "react-router-dom";

export const UserContext = React.createContext();

export default function UserInfo(props) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState({ role: "", id: 0 });

  const history = useHistory();

  const logout = (key) => {
    localStorage.removeItem(key);
    setUser({ role: "", name: "" });
    history.push("/login");
  };

  const login = () => {
    setLoggedIn(true);
  };

  const setInfo = (role, id) => {
    setUser({ role: role, id: id });
  };

  return (
    <UserContext.Provider value={{ loggedIn, user, logout, login, setInfo }}>
      {props.children}
    </UserContext.Provider>
  );
}
