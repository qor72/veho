const { do_induct_of } = require('./doInductOf');

const root = {
    Query: {
        _empty: () => null,
    },
    stow: ({ input }: { input: { value: string } }) => {
        // Implement your stow logic here
        return `Stowed: ${input.value}`;
    },
    induct: ({ input }: { input: { packageId: string, receivingWarehouseId: string, receivedOn: number } }) => {
        return do_induct_of(input);
    },
};

module.exports = { root };
