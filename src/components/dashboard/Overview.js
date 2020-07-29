import React from "react";
import Clients from "../Tables/Clients";
import BankAccounts from "../Tables/BankAccounts";
import Contracts from "../Tables/Contracts";
import Payments from "../Tables/Payments";

export default function Overview() {
  return (
    <React.Fragment>
      <Clients />
      <BankAccounts />
      <Contracts />
      <Payments />
    </React.Fragment>
  );
}
