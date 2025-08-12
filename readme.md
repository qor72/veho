# Welcome!

## Installation Requirements
versions, running tests, running "integration" tests

## Changes/Functionality
- Added a state, READY, that comes before INDUCTED, that is required to induct a package
- Induct Workflow calls out "when the pallet was received" when it should be package
- Induct will go through all packages provided and return an aggregated status for each