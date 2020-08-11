import React, { useState, useEffect } from "react";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import { lookForDbs, bootstrapDb } from "../utils/flureeFunctions";

export default function Database(props) {
  const [present, setPresent] = useState(false);
  const [response, setResponse] = useState("");
  const [open, setOpen] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  useEffect(() => {
    if (!present) {
      lookForDbs()
        .then((res) => {
          console.log(res);
          if (res === true) {
            setPresent(true);
            setResponse("DB present");
            setOpen(true);
          } else {
            console.log("false!");
            bootstrapDb("example/mdm").then((res) => {
              setPresent(true);
              setResponse(res);
              setOpen(true);
            });
          }
        })
        .catch((err) => {
          console.log(err);
          setResponse(err);
          setOpen(true);
        });
    }
  }, [present]);

  return (
    <React.Fragment>
      {props.children}
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "left" }}
        open={open}
        autoHideDuration={4000}
        onClose={handleClose}
        message={response}
        action={
          <React.Fragment>
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={handleClose}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      />
    </React.Fragment>
  );
}
