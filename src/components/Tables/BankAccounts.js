import React, { useState, useEffect } from "react";
import { useRouteMatch } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import TableView from "./TableView";
import AddBankAccount from "../Forms/AddBankAccount";
import { flureeQuery } from "../../utils/flureeFunctions";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
}));

export default function BankAccounts() {
  const [accounts, setAccounts] = useState([]);
  const classes = useStyles();
  const { path } = useRouteMatch();

  const fetchAccounts = () => {
    const bankQuery = {
      select: ["*", { owner: ["name"] }],
      from: "bankAccount",
      opts: {
        compact: true,
      },
    };
    flureeQuery(bankQuery)
      .then((res) => {
        console.log("bank", res);
        const flatAccounts = res.data.map((account) => {
          return {
            _id: account._id,
            routingNum: account.routingNum,
            accountNum: account.accountNum,
            owner: account.owner.name,
          };
        });
        setAccounts(flatAccounts);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchAccounts();
  }, []);

  return (
    <React.Fragment>
      {accounts.length === 0 ? null : (
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <TableView
              title="Bank Accounts"
              data={accounts}
              columns={["ID", "Owner", "Routing", "Account"]}
              values={["_id", "owner", "routingNum", "accountNum"]}
            />
          </Paper>
        </Grid>
      )}
      {path === "/dash/accounts" && (
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <AddBankAccount fetch={fetchAccounts} />
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
