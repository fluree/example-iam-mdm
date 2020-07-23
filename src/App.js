import React, { useEffect, useContext } from "react";
import { Switch, Route, useHistory, useLocation } from "react-router-dom";
import jwt from "jsonwebtoken";
import Dashboard from "./components/dashboard/Dashboard";
import AuthForm from "./components/Authentication/AuthForm";
import { UserContext } from "./context/UserContext";
import { flureeQuery } from "./utils/flureeFunctions";

function App() {
  const history = useHistory();
  const location = useLocation();
  const userState = useContext(UserContext);
  console.log(userState);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    
    if (location.pathname === "/") {
      if (token) {
        history.push("/dash");
      } else {
        history.push("/login");
      }
    }
  });

  return (
    <div className="App">
      <Switch>
        <Route path="/dash">
          <Dashboard />
        </Route>
        <Route path="/login">
          <AuthForm />
        </Route>
        <Route path="/register">
          <AuthForm register />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
