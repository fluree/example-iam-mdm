import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import Alert from "@material-ui/lab/alert";
import Title from "../Title";
import { flureeTransact, flureeQuery } from "../../utils/flureeFunctions";

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

export default function AddBankAccount(props) {
  const classes = useStyles();
  const [clients, setClients] = useState([]);
  const [form, setForm] = useState({
    owner: clients[0] || "",
    accountNum: "",
    routingNum: "",
  });
  const [error, setError] = useState("");

  const changeHandler = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    if (clients.length === 0) {
      const clientQuery = {
        select: ["name"],
        from: "client",
      };
      flureeQuery(clientQuery)
        .then((res) => {
          console.log("get clients", res.data);
          setClients(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [clients]);

  const submitHandler = (e) => {
    e.preventDefault();
    setError("");
    const newAccount = [
      {
        _id: "bankAccount#new",
        owner: form.owner,
        accountNum: parseInt(form.accountNum),
        routingNum: parseInt(form.routingNum),
      },
      {
        _id: form.owner,
        bankAccount: ["bankAccount#new"],
      },
    ];
    flureeTransact(newAccount)
      .then((res) => {
        console.log("add bank", res);
        props.fetch();
        setForm({ owner: "", accountNum: "", routingNum: "" });
      })
      .catch((err) => {
        console.log("add bank", err);
        setError(err.response.data.message);
      });
  };

  return (
    <React.Fragment>
      <Title>Add Bank Account</Title>
      <form className={classes.root} onSubmit={submitHandler}>
        <FormControl className={classes.formControl}>
          <InputLabel id="stage-label">Owner</InputLabel>
          <Select
            labelId="stage-label"
            id="client-stage-select"
            name="owner"
            value={form.owner}
            onChange={changeHandler}
          >
            {clients.length === 0
              ? null
              : clients.map((client, i) => (
                  <MenuItem key={i} value={client._id}>
                    {client.name}
                  </MenuItem>
                ))}
          </Select>
        </FormControl>
        <TextField
          name="accountNum"
          label="Account Number"
          value={form.accountNum}
          onChange={changeHandler}
        />
        <TextField
          name="routingNum"
          label="Routing Number"
          value={form.routingNum}
          onChange={changeHandler}
        />
        <IconButton className={classes.submitButton} type="submit">
          <AddIcon color="primary" />
        </IconButton>
      </form>
      {error && <Alert severity="error">{error}</Alert>}
    </React.Fragment>
  );
}
