import React, { useState, useEffect } from "react";
import { useRouteMatch } from "react-router-dom";
import { trackPromise, usePromiseTracker } from "react-promise-tracker";
import { flureeQuery } from "../../../../utils/flureeFunctions";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import TableView from "../../Tables/TableView";
import AddClient from "./AddClient";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
}));

export default function Clients() {
  const classes = useStyles();
  const { path } = useRouteMatch();

  const [showForm, setShowForm] = useState(false);
  const [clients, setClients] = useState([]);

  const { promiseInProgress } = usePromiseTracker();

  const fetchClients = () => {
    const clientsQuery = {
      select: ["*"],
      from: "client",
      opts: {
        compact: true,
      },
    };
    trackPromise(
      flureeQuery(clientsQuery)
        .then((res) => {
          console.log(res);
          setClients(res.data);
        })
        .catch((err) => {
          console.log(err);
        })
    );
  };

  useEffect(() => {
    if (clients.length === 0) {
      fetchClients();
    }
  }, [clients]);

  return (
    <React.Fragment>
      {promiseInProgress === true ? (
        <CircularProgress />
      ) : (
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <TableView
              title="Clients"
              data={clients}
              columns={["Account #", "Name", "Email", "Stage"]}
              values={["account", "name", "email", "dealStage"]}
            />
          </Paper>
        </Grid>
      )}
      {path === "/dash/clients" && (
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <AddClient />
          </Paper>
        </Grid>
      )}
    </React.Fragment>
  );
}
