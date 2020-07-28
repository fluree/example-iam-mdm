import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import DateFnsUtils from "@date-io/date-fns";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import Title from "../Title";
import { flureeQuery, flureeTransact } from "../../utils/flureeFunctions";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
  submitButton: {
    width: "3ch",
  },
}));

export default function AddPayment(props) {
  const classes = useStyles();
  const [selectedDate, setDate] = useState(new Date());

  const [accounts, setAccounts] = useState([]);
  const [form, setForm] = useState({
    amount: "",
    bankAccount: "",
  });

  useEffect(() => {
    if (accounts.length === 0) {
      const clientQuery = {
        select: ["_id", "name", "bankAccount"],
        from: "client",
      };
      flureeQuery(clientQuery)
        .then((res) => {
          console.log("get clients", res.data);
          const acc = [];
          for (let client of res.data) {
            if (client.bankAccount) {
              const bankInfo = client.bankAccount.map((bank) => {
                return [bank._id, client.name, client._id];
              });
              acc.push(...bankInfo);
            }
          }
          setAccounts([...acc]);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [accounts]);

  const changeHandler = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const newPayment = [
      {
        _id: "payment$new",
        amount: parseFloat(form.amount),
        bankAccount: form.bankAccount[0],
        date: Date.parse(selectedDate),
      },
      {
        _id: form.bankAccount[2],
        // _action: "upsert",
        "client/payment": ["payment$new"],
      },
    ];
    // debugger
    flureeTransact(newPayment)
      .then((res) => {
        console.log(res);
        props.fetch();
        // setForm({
        //   amount: "",
        //   bankAccount: [],
        // });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <React.Fragment>
      <Title>Add Payment</Title>
      <form className={classes.root} onSubmit={submitHandler}>
        <TextField
          name="amount"
          label="Amount ($)"
          value={form.amount}
          onChange={changeHandler}
        />
        <FormControl>
          <InputLabel id="account-label">Bank Account</InputLabel>
          <Select
            labelId="account-label"
            id="account-select"
            name="bankAccount"
            value={form.bankAccount}
            onChange={changeHandler}
          >
            {accounts.length === 0
              ? null
              : accounts.map((account) => (
                  <MenuItem key={account[0]} value={account}>
                    {`${account[1]} - ${account[0]}`}
                  </MenuItem>
                ))}
          </Select>
        </FormControl>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <DatePicker
            label="StartDate"
            value={selectedDate}
            onChange={setDate}
          />
        </MuiPickersUtilsProvider>
        <IconButton className={classes.submitButton} type="submit">
          <AddIcon color="primary" />
        </IconButton>
      </form>
    </React.Fragment>
  );
}
