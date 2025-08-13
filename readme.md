# Welcome!

## TODO
- All the documentation
- Pushing it to GitHub


## Requirements
- NodeJS v22.18.0 (a.k.a. `nvm use 22`)

1. Pull down the repository
2. `npm install`

## Available actions
- `npm build` -- build
- `npm test` -- run unit tests
- `npm start` -- start the GraphQL server on [localhost](http://localhost:4000/graphql)

## "Integration Tests"
More of a test frame to allow you to call the endpoint without using the UI.
- Induct: `npx ts-node test/inductExample.ts`
- Stow: `npx ts-node test/stowExample.ts`

## Example Induct GraphQL

### Query
```
mutation Induct($input: InductInput!) {
  induct(input: $input) {
    success
    itemResults {
      packageId
      success
      message
    }
  }
}
```
### Variables
```
{
  "input": {
    "packageIds": [
      "1234",
      "PKGREADY",
      "PKGINDUCTED"
    ],
    "receivingWarehouseId": "WH0A",
    "receivedOn": 8675309
  }
}
```

## Example Stow GraphQL Query

### Query
```
mutation Stow($input: StowInput!) {
  stow(input: $input) {
    success
    message
  }
}
```

### Variables
```
{
  "input": {
    "palletId": "PAL01",    
    "packageIds": ["PKGBADDATA"
    ],
    "stowedOn": 8675309
  }
}
```

## Changes (Where's the product owner!?)
- Added a state, READY, that comes before INDUCTED, that is required to induct a package
- Induct will go through all packages provided and return an aggregated status for each
- Pallets must exist before they can be loaded
- induct and stow offer different behaviors; induct will do what it can while stow aborts on any error
- If a Package is requested to be "re-stowed" on a pallet that it's already on, that's OK


## Mea Culpa
- Both `do_stow_of` and `stow_packages` should be refactored to have DB as a parameter and the tests updated to verify the DB calls
  - In a production system, may want an additional layer between Loki and the two aforementioned functions. For this example, I kept it simple.
  - While this form of validation is functional, it's not pretty, nor easily extensible. It's something I would flag in a code review.
- If `stow_pacakages` fails during the "updates" there's no rollback
- Probably should verify valid Warehouse IDs


## Notes/Thoughts
- Shouldn't Stow include the Warehouse where the package(s) were stowed? Suppose we could get that off of a Pallet except...
- Shouldn't a Pallet also have a Warehouse associated with it so we can verify if a package can be put onto the pallet?
- Not a fan of passing the "received on" timestamps in the queries. Seems like a bug waiting to happen.


## Nit picks?
- In the handout: the Induct Workflow calls out "when the pallet was received" when it should be package?
