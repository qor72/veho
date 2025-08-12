# Welcome!


## Installation Requirements
versions, running tests, running "integration" tests


## Changes (Where's the product owner!?)
- Added a state, READY, that comes before INDUCTED, that is required to induct a package
- Induct Workflow calls out "when the pallet was received" when it should be package
- Induct will go through all packages provided and return an aggregated status for each
- Pallets must exist before they can be loaded
- induct and stow offer different behaviors; induct will do what it can while stow aborts on any error
- If a Package is requested to be "re-stowed" on a pallet that it's already on, that's OK


## Comments
- Shouldn't Stow include the Warehouse where the package(s) were stowed? Suppose we could get that off of a Pallet except...
- Shouldn't a Pallet also have a Warehouse associated with it so we can verify if a package can be put onto the pallet?
- Not a fan of passing the "received on" timestamps in the queries. Seems like a bug waiting to happen.
- Known: if Stow fails during the "updates" there's no rollback

