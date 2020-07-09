# MDM Demo app notes

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
| routingNum | int  | unique                          |                                       |
| accountNum | int  |                                 | should this be hashed before storing? |
| owner      | ref  | restrict to `client` collection |                                       |

### `contract` collection (only sales can transact / both can query)

| Predicate | Type  | Options | Rule |
| --------- | ----- | ------- | ---- |
| amount    | float |         |      |

### `payment` collection (only accounting can transact, both can query)

| Predicate   | Type    | Options                              | Rule |
| ----------- | ------- | ------------------------------------ | ---- |
| amount      | float   |                                      |      |
| bankAccount | ref     | restrict to `bankAccount` collection |      |
| date        | instant |                                      |      |
