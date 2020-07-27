import React, { useState } from "react";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Title from "../Title";

// Generate Order Data

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

export default function TableView(props) {
  const classes = useStyles();

  const [showForm, setShowForm] = useState(false);

  const clickHandler = (e) => {
    console.log(e.target.id);
  };

  return (
    <React.Fragment>
      <Title>{props.title}</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            {props.columns.map((column) => (
              <TableCell key={column}>{column}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {props.data.map((client) => (
            <TableRow key={client._id}>
              {props.values.map((value, i) => (
                <TableCell key={i}>{client[value]}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}
