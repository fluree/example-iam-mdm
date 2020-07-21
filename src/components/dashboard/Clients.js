import React from "react";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Title from "./Title";

// Generate Order Data

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

export default function Clients(props) {
  const classes = useStyles();

  const clickHandler = (e) => {
    console.log(e.target.id);
  };

  return (
    <React.Fragment>
      <Title>Clients</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Account #</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Stage</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.clients.map((client) => (
            <TableRow key={client._id}>
              <TableCell>{client.account}</TableCell>
              <TableCell id={client._id} onClick={clickHandler}>
                {client.name}
              </TableCell>
              <TableCell>{client.email}</TableCell>
              <TableCell>{client.dealStage}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className={classes.seeMore}></div>
    </React.Fragment>
  );
}
