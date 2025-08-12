const root = {
    Query: {
        _empty: () => null,
    },
    stow: ({ input }: { input: { value: string } }) => {
        // Implement your stow logic here
        return `Stowed: ${input.value}`;
    },
    induct: ({ input }: { input: { packageId: string, receivingWarehouseId: string, receivedOn: number } }) => {
        // Implement your induct logic here
        return `Inducted: ${input.packageId}, ${input.receivingWarehouseId}, ${input.receivedOn}`;
    },
};

module.exports = { root };
