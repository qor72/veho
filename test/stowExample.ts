const fetch = require('node-fetch').default;

async function callStowMutation() {
    const query = `
    mutation Stow($input: StowInput!) {
      stow(input: $input)
    }
  `;

    const variables = {
        input: {
            value: "Example value"
        }
    };

    const response = await fetch('http://localhost:4000/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query, variables })
    });

    const data = await response.json();
    console.log('Stow mutation response:', data);
}

callStowMutation().catch(console.error);
