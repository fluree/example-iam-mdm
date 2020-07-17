# MDM Demo app notes

## `_role` notes

Two roles for this demo:

- Accounting
- Sales

I feel like most of the rules regarding transactions / queries can be applied on this level, but would love to hear anybody else's input regarding that.

## Schema Notes

### `client` collection

| Predicate   | Type   | Options                                        | Rule                                                                    |
| ----------- | ------ | ---------------------------------------------- | ----------------------------------------------------------------------- |
| name        | string |                                                |                                                                         |
| email       | string |                                                | `valid-email?`                                                          |
| account     | int    | unique                                         |                                                                         |
| dealStage   | tag    |                                                | accounting can only access "customer" tag                               |
| bankAccount | ref    | multi(?), restrict to `bankAccount` collection | only attached to "customers", only accounting role can query / transact |
| contract    | ref    | restrict to `contract` collection              | only sales can transact, both roles can query                           |
| payment     | ref    | multi, restrict to `payment` collection        | only accounting can transact, both roles can query                      |

### `bankAccount` collection (only accounting can transact / query)

| Predicate  | Type | Options                         | Rule                                  |
| ---------- | ---- | ------------------------------- | ------------------------------------- |
| routingNum | int  |                                 |                                       |
| accountNum | int  |                                 | should this be hashed before storing? |
| owner      | ref  | restrict to `client` collection |                                       |

### `contract` collection (only sales can transact / issuedBy `_user` can update / both can query)

| Predicate    | Type    | Options                        | Rule |
| ------------ | ------- | ------------------------------ | ---- |
| amount       | float   |                                |      |
| startDate    | instant |                                |      |
| deliverables | string  | multi                          |      |
| issuedBy     | ref     | restrict to `_user` collection |      |

### `payment` collection (only accounting can transact, both can query)

| Predicate   | Type    | Options                              | Rule |
| ----------- | ------- | ------------------------------------ | ---- |
| amount      | float   |                                      |      |
| bankAccount | ref     | restrict to `bankAccount` collection |      |
| date        | instant |                                      |      |
