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
  console.log(userState)

  useEffect(() => {
    if (
      location.pathname === "/login" ||
      location.pathname === "/register" ||
      userState.loggedIn
    ) {
      return;
    }
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
    } else {
      history.push("/register");
    }
  }, [history, location.pathname]);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token && !userState.role && userState.loggedIn) {
      const { sub } = jwt.decode(token);
      const roleQuery = {
        selectOne: [
          {
            roles: ["*"],
            "_user/_auth": ["username"],
          },
        ],
        from: ["_auth/id", sub],
        opts: {
          compact: true,
        },
      };
      flureeQuery(roleQuery)
        .then((auth) => {
          console.log(auth.roles, auth._user);
          userState.setInfo(auth.roles[0]["id"], auth._user[0].username);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [userState.loggedIn]);


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
