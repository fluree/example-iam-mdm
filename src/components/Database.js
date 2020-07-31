import  { useState, useEffect } from "react";
import { lookForDbs, bootstrapDb } from "../utils/flureeFunctions";

export default function Database(props) {
  const [present, setPresent] = useState(false);

  useEffect(() => {
    if (!present) {
      lookForDbs()
        .then((res) => {
          console.log(res);
          if (res === true) {
            setPresent(true);
          } else {
            console.log("false!");
            bootstrapDb("example/mdm")
              .then((res) => {
                setPresent(true);
              })
              .catch((err) => console.log(err));
          }
        })
        .catch((err) => console.log(err));
    }
  }, [present]);

  return { ...props.children };
}
