# Fluree MDM Demo

## Getting Started

This repos contains a simple React app that demonstrates a potential use case for using Fluree as the single source of truth for users with different roles in an organization using the Fluree password API, along with smart functions, rules, and roles. These tools can provide powerful security across an organization's data, allowing users to only access and transact the data their role requires them to.

Run `npm install` to install all of the dependencies for the demo app. This demo requires a local instance of Fluree to be running (v 0.15 or greater recommended). You can [get the latest version here](https://fluree-releases-public.s3.amazonaws.com/fluree-latest.zip#). Once that has been started using the shell command `./fluree_start.sh`, you can run `npm start`, which will start up the app, and create a ledger called `example/mdm` in Fluree if one is not present. Play around with the app to check out how Fluree handles data permissions.

## Going further

If you'd like a more hands-on experience, I'd reccomend forgoing the app altogether, and transacting the FlureeDB schema manually through the Fluree Admin dashboard. Using this method, you can choose to transact the [protected schema](./src/data/03-protected-schema.json), or an alternate [unprotected schema](./src/data/03-unprotected-schema.json). Using an API tool, you can manually make transactions and queries using JWT tokens to compare the behavior of the protected schema to the unprotected schema. For example, you can create a few sales users, and add some contracts. See what happens when you try to update a contract issued by another user in the protected schema vs. the unprotected schema.

## Smart functions

Smart functions are they key to data security in Fluree. The simplest of the these are the built-in `true` and `false` smart functions. In this demo, the simplest permission rules used the `true` smart function to allow queries and transactions to collections and predicates. There were three rules that required custom smart-functions:

### Accounting role can only query clients tagged as "customers"

```
  {
    "_id": "_fn$isClientCustomer",
    "name": "isClientCustomer",
    "code": "(relationship? (?sid) [\"client/dealStage\"] [\"_tag/id\", \"client/dealStage:[\\\"customer\\\"]\"])"
  }
```

This smart function uses the built-in `relationship?` function to determine if the subject id has a connection to the "customer" tag. The `relationship?` function takes three parameters, the starting subject, the path, and the end subject. If the function can traverse between the subject ID being queried (`?sid`) and the "customer" tag using the path provided, it will resolve to true. If not, it will resolve false, and the query will return no information for that particular subject.

### Bank accounts can only be transacted for clients tagged as "customers"

```
  {
    "_id": "_fn$canAddBankAccount",
    "name": "canAddBankAccount",
    "code": "(relationship? (?sid) [\"bankAccount/owner\", \"client/dealStage\"] [\"_tag/id\", \"client/dealStage:[\\\"customer\\\"]\"])"
  }
```

This function works very similar to the previous smart function, but it has to traverse a slightly longer path. Again, if the `relationship?` function can succesfully traverse between the start subject and the end subject, it will resolve to true, allowing a transaction to occur. Otherwise, it will resolve to false, and the transaction request will receive an error as a response.

### Contracts can only be updated by the user referenced in the `contract/issuedBy` predicate

```
  {
    "_id": "_fn$isContractIssuedBy",
    "name": "isContractIssuedBy",
    "code": "(relationship? (?sid) [\"contract/issuedBy\" \"_user/auth\"] (?auth_id))"
  }
```

This one is also very similar to the previous functions, but instead of attempting to traverse from the transacted subject's id to a static subject, it's traversing to the `issuedBy` user's auth record, and checking if the subject id of the record matches the auth id being passed to Fluree by the JSON web token (using the Password authentication API). If the id's match up, the function resolves to true, and the contract can be updated.
