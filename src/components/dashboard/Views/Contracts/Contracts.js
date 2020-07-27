import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import TableView from "../../Tables/TableView";

import { flureeQuery } from "../../../../utils/flureeFunctions";

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

  useEffect(() => {
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
          return {
            _id: contract._id,
            amount: contract.amount,
            startDate: contract.startDate,
            issuedBy: contract.issuedBy.username,
            deliverables: contract.deliverables.join(" | "),
          };
        });
        setContracts(flatContracts);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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
    </React.Fragment>
  );

  // if (accounts.length === 0) {
  //   return null;
  // } else {
  //   return (
  //   );
  // }
}
