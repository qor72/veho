const { do_induct_of } = require('./doInductOf');

const root = {
    Query: {
        _empty: () => null,
    },
    stow: ({ input }: { input: { value: string } }) => {
        // Implement your stow logic here
        return `Stowed: ${input.value}`;
    },
    induct: ({ input }: { input: { packages: string[], receivingWarehouseId: string, receivedOn: number } }) => {
        if (!input.packages || input.packages.length === 0) {
            throw new Error("No packages provided for induction.");
        }

        const results = input.packages.map(packageId => {
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