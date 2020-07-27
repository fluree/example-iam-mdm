import React, { useState } from "react";
import { useHistory } from "react-router-dom";

export const UserContext = React.createContext();

export default function UserInfo(props) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [role, setRole] = useState("");

  const history = useHistory();

  const logout = (key) => {
    localStorage.removeItem(key);
    setRole("");
    history.push("/login");
  };

  const login = () => {
    setLoggedIn(true);
  };

  const setInfo = (role) => {
    setRole(role);
  };

  return (
    <UserContext.Provider value={{ loggedIn, role, logout, login, setInfo }}>
      {props.children}
    </UserContext.Provider>
  );
}
