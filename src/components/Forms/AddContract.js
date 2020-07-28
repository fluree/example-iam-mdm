import React, { useState, useEffect, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import Alert from "@material-ui/lab/alert";
import DateFnsUtils from "@date-io/date-fns";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import Title from "../Title";
import { flureeQuery, flureeTransact } from "../../utils/flureeFunctions";
import { UserContext } from "../../context/UserContext";

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

export default function Addcontract(props) {
  const classes = useStyles();
  const user = useContext(UserContext);

  const [startDate, setStart] = useState(new Date());
  const [clients, setClients] = useState([]);
  const [form, setForm] = useState({
    client: "",
    amount: "",
    startDate: "",
    deliverables: "",
  });
  const [error, setError] = useState("");

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

  const changeHandler = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    setError("");
    const newcontract = [
      {
        _id: "contract$new",
        amount: parseFloat(form.amount),
        startDate: Date.parse(startDate),
        deliverables: form.deliverables.split(","),
        issuedBy: user.user.id,
      },
      {
        _id: form.client,
        "client/contract": "contract$new",
      },
    ];
    flureeTransact(newcontract)
      .then((res) => {
        console.log(res);
        props.fetch();
        setForm({
          amount: "",
          startDate: "",
          deliverables: "",
          client: "",
        });
      })
      .catch((err) => {
        // debugger;
        console.log(err.response.data.message);
        setError(err.response.data.message);
      });
  };

  return (
    <React.Fragment>
      <Title>Add Contract</Title>
      <form className={classes.root} onSubmit={submitHandler}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <DatePicker label="StartDate" value={startDate} onChange={setStart} />
        </MuiPickersUtilsProvider>
        <FormControl>
          <InputLabel id="client-label">Client</InputLabel>
          <Select
            labelId="client-label"
            id="client-select"
            name="client"
            value={form.client}
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
          name="amount"
          label="Amount ($)"
          value={form.amount}
          onChange={changeHandler}
        />
        <TextField
          name="deliverables"
          label="Deliverables"
          value={form.deliverables}
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
