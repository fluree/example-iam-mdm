import React, { useState, useEffect } from "react";
import { useRouteMatch } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import TableView from "./TableView";
import AddContract from "../Forms/AddContract";
import { flureeQuery } from "../../utils/flureeFunctions";
import EditContract from "../Forms/EditContract";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
}));

export default function Contracts() {
  const [contracts, setContracts] = useState([]);
  const classes = useStyles();
  const { path } = useRouteMatch();

  useEffect(() => {
    fetchContracts();
  }, []);

  const fetchContracts = () => {
    const contractQuery = {
      select: ["*", { issuedBy: ["username"] }],
      from: "contract",
      opts: {
        compact: true,
      },
    };
    flureeQuery(contractQuery)
      .then((res) => {
        console.log("contract", res);
        const flatContracts = res.data.map((contract) => {
          const displayDate = new Date(contract.startDate);
          return {
            _id: contract._id,
            amount: contract.amount,
            startDate: displayDate.toLocaleDateString(),
            issuedBy: contract.issuedBy.username,
            deliverables: contract.deliverables.join(", "),
          };
        });
        setContracts(flatContracts);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <React.Fragment>
      {contracts.length === 0 ? null : (
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <TableView
              title="Contracts"
              data={contracts}
              columns={[
                "ID",
                "Start Date",
                "Amount",
                "Issued By",
                "Deliverables",
              ]}
              values={[
                "_id",
                "startDate",
                "amount",
                "issuedBy",
                "deliverables",
              ]}
            />
          </Paper>
        </Grid>
      )}
      {path === "/dash/contracts" && (
        <React.Fragment>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <AddContract fetch={fetchContracts} />
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <EditContract fetch={fetchContracts} contracts={contracts} />
            </Paper>
          </Grid>
        </React.Fragment>
      )}
    </React.Fragment>
  );
}
