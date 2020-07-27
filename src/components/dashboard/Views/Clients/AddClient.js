import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import Title from "../../../Title";
import { flureeTransact } from "../../../../utils/flureeFunctions";

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

export default function AddClient(props) {
  const classes = useStyles();

  const [client, setClient] = useState({
    account: "",
    name: "",
    email: "",
    stage: "",
  });

  const [error, setError] = useState("");

  const changeHandler = (e) => {
    setClient({
      ...client,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const newClient = [
      {
        _id: "client#new",
        account: parseInt(client.account),
        name: client.name,
        email: client.email,
        dealStage: [client.stage],
      },
    ];
    flureeTransact(newClient)
      .then((res) => {
        console.log(res);
        props.fetch();
        setClient({ account: "", name: "", email: "", stage: "" });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <React.Fragment>
      <Title>Add Client</Title>
      <form className={classes.root} onSubmit={submitHandler}>
        <TextField
          name="account"
          label="Account #"
          value={client.account}
          onChange={changeHandler}
        />
        <TextField
          name="name"
          label="Client Name"
          value={client.name}
          onChange={changeHandler}
        />
        <TextField
          name="email"
          label="Email address"
          value={client.email}
          onChange={changeHandler}
        />
        <FormControl className={classes.formControl}>
          <InputLabel id="stage-label">Stage</InputLabel>
          <Select
            labelId="stage-label"
            id="client-stage-select"
            name="stage"
            value={client.stage}
            onChange={changeHandler}
          >
            <MenuItem value="prospect">Prospect</MenuItem>
            <MenuItem value="customer">Customer</MenuItem>
            <MenuItem value="lapsed">Lapsed</MenuItem>
          </Select>
        </FormControl>
        <IconButton className={classes.submitButton} type="submit">
          <AddIcon color="primary" />
        </IconButton>
      </form>
    </React.Fragment>
  );
}
