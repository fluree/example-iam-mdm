import React, { useState, useEffect } from "react";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import Alert from "@material-ui/lab/alert";
import Title from "../Title";
import DateFnsUtils from "@date-io/date-fns";
import { makeStyles } from "@material-ui/core/styles";
import { flureeTransact } from "../../utils/flureeFunctions";

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

export default function EditContract(props) {
  const classes = useStyles();
  const [currentContract, setCurrent] = useState("");
  const [form, setForm] = useState({
    _id: "",
    amount: "",
    deliverables: "",
  });
  const [startDate, setStart] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (currentContract !== "") {
      const { _id, amount, deliverables, startDate } = props.contracts[
        currentContract
      ];
      setForm({ _id, amount, deliverables });
      setStart(startDate);
    }
  }, [currentContract]);

  const contractHandler = (e) => {
    setCurrent(e.target.value);
  };

  const changeHandler = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const transaction = [
      {
        _id: form._id,
        amount: parseFloat(form.amount),
        deliverables: form.deliverables.split(","),
        startDate: Date.parse(startDate),
      },
    ];
    flureeTransact(transaction)
      .then((res) => {
        console.log("edit contract", res);
        props.fetch();
        setCurrent("");
      })
      .catch((err) => {
        console.log(err.response);
        setError(err.response.data.message)
      });
  };

  return (
    <React.Fragment>
      <Title>Edit Contracts</Title>
      <form className={classes.root} onSubmit={submitHandler}>
        <FormControl>
          <InputLabel id="contract-label">Client</InputLabel>
          <Select
            labelId="contract-label"
            id="contract-select"
            value={currentContract}
            onChange={contractHandler}
          >
            {props.contracts.length === 0
              ? null
              : props.contracts.map((contract, i) => (
                  <MenuItem key={i} value={i}>
                    {contract._id}
                  </MenuItem>
                ))}
          </Select>
        </FormControl>
        {currentContract !== "" && (
          <React.Fragment>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <DatePicker
                label="StartDate"
                value={startDate}
                onChange={setStart}
              />
            </MuiPickersUtilsProvider>
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
              <EditIcon />
            </IconButton>
          </React.Fragment>
        )}
      </form>
      {error && <Alert severity="error">{error}</Alert>}
    </React.Fragment>
  );
}
