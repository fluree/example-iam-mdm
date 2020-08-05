import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import "./index.css";
import App from "./App";
import UserInfo from "./context/UserContext";
import * as serviceWorker from "./serviceWorker";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#13C6FF",
    },
    secondary: {
      main: "#4B56A5",
    },
  },
});

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <UserInfo>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </UserInfo>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
