import React, { useEffect } from "react";
import { Switch, Route, useHistory, useLocation } from "react-router-dom";
import jwt from "jsonwebtoken";
import Dashboard from "./components/dashboard/Dashboard";
import AuthForm from "./components/Authentication/AuthForm";

function App() {
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (location.pathname === "/login" || location.pathname === "/register") {
      return;
    }
    if (token) {
      const { iss, exp } = jwt.decode(token);
      const now = Date.now();
      if (iss === "example/mdm" && exp > now) {
        history.push("/dash");
      } else {
        localStorage.removeItem("authToken");
        history.push("/login");
      }
    } else {
      history.push("/register");
    }
  }, [history, location.pathname]);

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
