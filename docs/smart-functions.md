## Smart functions

Smart functions are they key to data security in Fluree. The simplest of the these are the built-in `true` and `false` smart functions. They simply return `true` or `false` respectively when executed. In this demo, the simplest permission rules used the `true` smart function to allow queries and transactions to collections and predicates. There were three rules that required custom smart-functions:

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

Next, take a look at [how smart functions can be applied to the ledger schema](./applying-smart-functions.md)