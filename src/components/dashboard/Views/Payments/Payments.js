import React, { useState, useEffect } from "react";
import TableView from "../../Tables/TableView";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import { flureeQuery } from "../../../../utils/flureeFunctions";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
}));

export default function Payments() {
  const classes = useStyles();
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    const paymentQuery = {
      select: ["*", { bankAccount: ["_id"] }],
      from: "payment",
      opts: {
        compact: true,
      },
    };
    flureeQuery(paymentQuery)
      .then((res) => {
        console.log("payment", res);
        const flatPayments = res.data.map((payment) => {
          return {
            _id: payment._id,
            amount: payment.amount,
            accountID: payment.bankAccount._id,
            date: payment.date
          }
        })
        setPayments(flatPayments)
      })
      .catch((err) => {
        console.log(err);
      });
  });

  return (
    <React.Fragment>
      {payments.length === 0 ? null : (
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <TableView
              title="Payments"
              data={payments}
              columns={["Payment ID", "Amount", "Account ID", "Date"]}
              values={["_id", "amount", "accountID", "date"]}
            />
          </Paper>
        </Grid>
      )}
    </React.Fragment>
  );
}
