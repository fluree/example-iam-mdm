import React, { useState, useEffect } from "react";
import { trackPromise, usePromiseTracker } from "react-promise-tracker";
import { flureeQuery } from "../../../utils/flureeFunctions";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import CircularProgress from "@material-ui/core/CircularProgress";
import Title from "../Tables/Title";
import TableView from "../Tables/TableView";

// Generate Order Data

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

export default function Clients() {
  const classes = useStyles();

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

  const clickHandler = (e) => {
    console.log(e.target.id);
  };

  return (
    <React.Fragment>
      {(promiseInProgress === true) ? (
        <CircularProgress />
      ) : (
        <TableView
          title="Clients"
          data={clients}
          columns={["Account #", "Name", "Email", "Stage"]}
          values={["account", "name", "email", "dealStage"]}
        />
      )}
    </React.Fragment>
  );
}
