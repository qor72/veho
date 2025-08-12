const { do_induct_of } = require('./doInductOf');
const { stow_packages } = require('./doStowOf');

const root = {
    Query: {
        _empty: () => null,
    },
    stow: ({ input }: { input: { palletId: string, stowedOn: number, packageIds: string[] } }) => {
        if (!input.palletId || !input.packageIds || input.packageIds.length === 0) {
            throw new Error("Pallet ID and package IDs must be provided for stowing.");
        }

        // Not sure I like this being tightly coupled...
        return stow_packages(input);
    },
    induct: ({ input }: { input: { packageIds: string[], receivingWarehouseId: string, receivedOn: number } }) => {
        if (!input.packageIds || input.packageIds.length === 0) {
            throw new Error("No packages provided for induction.");
        }

        const results = input.packageIds.map(packageId => {
            return do_induct_of({ packageId, receivingWarehouseId: input.receivingWarehouseId, receivedOn: input.receivedOn });
        });

        const response = {
            success: results.every(result => result.success),
            itemResults: results,
        };
        return response;
    },
};

module.exports = { root };