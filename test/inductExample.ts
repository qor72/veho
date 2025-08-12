const fetch = require('node-fetch').default;

async function callInductMutation() {
    const query = `
    mutation Induct($input: InductInput!) {
      induct(input: $input)
    }
  `;

    const variables = {
        input: {
            packages: ["PKG123", "PKG456"],
            receivingWarehouseId: "WH789",
            receivedOn: 1691865600 // Example timestamp
        }
    };

    const response = await fetch('http://localhost:4000/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query, variables })
    });

    const data = await response.json();
    // The return type is a stringified array of InductionResult objects
    // Example: [{ success: true, message: "..." }, ...]
    const results = JSON.parse(data.data.induct);
    console.log('Induct mutation results:', results);
}

callInductMutation().catch(console.error);
