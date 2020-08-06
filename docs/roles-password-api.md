# User roles and the password API

The demo app in this repo utilizes Fluree's password API, as opposed to the default public/private key pair identity management. When a user successfully authenticates against the `/fdb/[NETWORK-NAME]/[DBID]/pw/generate` or `/fdb/[NETWORK-NAME]/[DBID]/pw/login` endpoint, Fluree responds with a JSON Web Token (JWT). This token is then included in the `Authorization` header of each HTTP request sent to the Fluree API. With this token, a user's identity can be determined, and each query and transaction will be signed by that user.

## Generating a new user with a role

When creating a new user, it is important to include `create-user?: true` key/value pair in the transaction, or else it will be denied. In order for a user to have access to any ledger data, you must also include at least one role in the transaction as well. This can be the built-in `root` role, or any custom roles we've created, like the `sales` and `accountant` roles in the demo app. Below is an example transaction to create a new user with a "sales" role. This transaction request would then be sent to the `pw/generate` endpoint.

```
{
  "user": "salesperson3215",
  "password": "wellthoughtoutpassword",
  "create-user?": true,
  "roles": [["_role/id", "sales"]],
  "expire": 999999999
}
```

If the transaction sent is successful, Fluree will then automatically create a new `_auth` record, and a new `_user` record with a reference to the `_auth` record referenced in the `_user/auth` predicate. The specified `_role` for the new user will be referenced in the `_auth/roles` predicate.

## Logging in with an existing user

Authenticating an existing user is as simple as sending an object containing the username and password to the `pw/login` endpoint to obtain a JWT.

```
{
  "user": "salesperson3215",
  "password": "wellthoughtoutpassword"
}
```
