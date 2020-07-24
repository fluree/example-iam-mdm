import React, {useContext} from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import {UserContext} from "../../../context/UserContext";
import Clients from "./Clients/Clients";
import BankAccounts from "./BankAccounts";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
}));

export default function Overview() {
  const classes = useStyles();
  const userState = useContext(UserContext)

  return (
    <React.Fragment>
      {" "}
      <Grid item xs={3}>
        <Paper className={classes.paper}>
          <Typography component="h2">Welcome {userState.user}</Typography>
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <Paper className={classes.paper}>
          <Clients />
        </Paper>
      </Grid>
      <BankAccounts />
    </React.Fragment>
  );
}
