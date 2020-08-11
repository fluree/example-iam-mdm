# Fluree IAM / MDM Demo

## Getting Started

This repos contains a simple React app that demonstrates a potential use case for using Fluree as the single source of truth for users with different roles in an organization using the Fluree password API, along with smart functions, rules, and roles. These tools can provide powerful security across an organization's data, allowing users to only access and transact the data their role requires them to.

Run `npm install` to install all of the dependencies for the demo app. This demo requires a local instance of Fluree to be running (v 0.15 or greater recommended). You can [get the latest version here](https://fluree-releases-public.s3.amazonaws.com/fluree-latest.zip#). Once that has been started using the shell command `./fluree_start.sh`, you can run `npm start`, which will start up the app, and create a ledger called `example/mdm` in Fluree if one is not present. Play around with the app to check out how Fluree handles data permissions.

## Going further



If you'd like a more hands-on experience, I'd reccomend forgoing the app altogether, and transacting the FlureeDB schema manually through the Fluree Admin dashboard. Using this method, you can choose to transact the [protected schema](./src/data/03-protected-schema.json), or an alternate [unprotected schema](./src/data/03-unprotected-schema.json). Using an API tool, you can manually make transactions and queries using JWT tokens to compare the behavior of the protected schema to the unprotected schema. For example, you can create a few sales users, and add some contracts. See what happens when you try to update a contract issued by another user in the protected schema vs. the unprotected schema.

For a more in-depth look at the smart functions created for this project, check out the [smart function explainer](./docs/smart-functions.md).