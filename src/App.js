import React, { useEffect } from "react";
import { Switch, Route, useHistory } from "react-router-dom";
import jwt from "jsonwebtoken";
import logo from "./logo.svg";
import Dashboard from "./components/dashboard/Dashboard";
import AuthForm from "./components/Authentication/AuthForm";
import "./App.css";

function App() {
  const history = useHistory();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      const { iss, exp } = jwt.decode(token);
      const now = Date.now();
      if (iss === "example/mdm" && exp > now) {
        history.push("/dash");
      } else {
        localStorage.removeItem("authToken");
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
