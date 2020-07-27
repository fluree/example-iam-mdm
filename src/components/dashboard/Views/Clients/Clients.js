import React, { useState, useEffect } from "react";
import { useRouteMatch } from "react-router-dom";
import { trackPromise, usePromiseTracker } from "react-promise-tracker";
import { flureeQuery } from "../../../../utils/flureeFunctions";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import TableView from "../../Tables/TableView";
import AddClient from "./AddClient";

// Generate Order Data

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles((theme) => ({}));

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
        <TableView
          title="Clients"
          data={clients}
          columns={["Account #", "Name", "Email", "Stage"]}
          values={["account", "name", "email", "dealStage"]}
        />
      )}
      {path === "/dash/clients" && <AddClient />}
    </React.Fragment>
  );
}
