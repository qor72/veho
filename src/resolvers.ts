const root = {
    stow: ({ input }: { input: { value: string } }) => {
        // Implement your stow logic here
        return `Stowed: ${input.value}`;
    },
    induct: ({ input }: { input: { value: string } }) => {
        // Implement your induct logic here
        return `Inducted: ${input.value}`;
    },
};

module.exports = { root };
