# Fluree Master Data Management

Concepts covered:

- Master Data Management

  - Single version of truth
  - Ease of uniformity of data across all users
  - Data security

- Fluree-specific
  - Smart functions
    - Can be attached to predicates / collections, or attached to rules
    - Resolve to true or false
    - Q's/T's can only be completed if all executed smart functions resolve to true
    - Errors only return on transactions
    - Lack of error for queries is seen as privacy / security feature
  - Rules
    - Can be used to attach smart functions to specific collections and predicates
    - Rules can be as simple as applying the built-in `true` smart function to a collection to allow access to data
    - Can apply to queries, transactions, or both
  - Roles
    - A collection of rules that can be applied to a user
    - `_role/rules` is where all of a specific type of user's data roles are aggregated
    - Roles are generally associated with a user's `_auth` record
  - `_user/auth`
    - Using `pw/generate` endpoint with example transaction handles a lot of the plumbing for you
    - `_user` subject is created, `_auth` subject is created
    - if a role is specified in `pw/generate` transaction, the specified role will be referenced to the user's `_auth/roles` predicate
  - Password API
    - Method by which authentication is performed (JWT, `_auth/id`, `_auth/roles`)
    - Use of public/private key style cryptographic signing for queries and transactions
    - Private key is never stored, but is hashed anew with each query / transaction using a key encrypted in the JWT and `_auth/salt`, and then used to sign the query / transaction

This repo is a basic demo for some of Fluree's Master Data Management capabilities. Specifically,
