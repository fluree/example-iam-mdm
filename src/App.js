import React from "react";
import { Switch, Route } from "react-router-dom";
import logo from "./logo.svg";
import Dashboard from "./components/dashboard/Dashboard";
import AuthForm from "./components/Authentication/AuthForm";
import "./App.css";

function App() {
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
