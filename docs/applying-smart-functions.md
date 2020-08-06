# Applying Smart Functions in Fluree

There are a variety of ways to use smart functions in Fluree. Here, we will go over some of the ways smart functions were applied in this demo app.

## Collection spec

```
{
  "_id": "_collection",
  "name": "contract",
  "doc": "clients' contract data",
  "spec": [["_fn/name", "isContractIssuedBy"]]
}
```

The `isContractIssueBy` smart function is applied directly to the `contract` collection, using the `collection/spec` predicate. This predicate allows for any referenced smart functions to be executed upon a transaction attempt to the collection. Since we don't want anybody editing a contract they didn't issue, this can be applied to the collection, and will therefore apply to any user, regardless of their role.

## Predicate spec

```
{
    "_id": "_predicate",
    "name": "contract/amount",
    "type": "float",
    "spec": [["_fn/name", "numMustBePositive"]]
}
```

The `numMustBePositive` smart function is applied to the `contract/amount` predicate. This assures that any time a transaction is performed on that predicate, regardless of user, only a positive float value will be accepted. Any attempts to transact a negative value to the predicate will cause the smart function to resolve to false and the transaction to fail.

## Rules & Roles

A good starting place for learning about roles and rules in Fluree is the [official guide](https://docs.flur.ee/guides/identity/auth-records#user-and-auth-entities)

Rules are another way you can apply a smart function to specific collections and/or predicates. The difference is that smart functions applied via a rule can be executed for transactions, queries, or both. In the demo schema, each rule grants explicit query or transaction access to a user with the built-in `true` smart function. Multiple smart functions can be associated with a rule, like in the `_rule` below:

```
{
  "_id": "_rule$accountingQueryClient",
  "id": "accountingQueryClient",
  "doc": "Accountant basic query permissions for client collection",
  "collection": "client",
  "predicates": ["*"],
  "fns": [
    ["_fn/name", "true"],
    ["_fn/name", "isClientCustomer"]
  ],
  "ops": ["query"]
}
```

That rule allows for all predicates in the `client` collection to be queried, but only for customers with the `client/dealStage` tag "customer". The second referenced function must resolve to true for the user to retrieve a client's data. This rule is then referenced in the `rules` predicate associated with the `accountant` role, and that role is referenced in a user's `_auth` record to determine the data that the user has access to.

Roles are a powerful, built-in data security tool. Using them, we can determine what type of users can query and / or transact each type of data. If you're interested in how these roles fit in with username / password authentication, check out [how roles work with the password API](./roles-password-api.md)
