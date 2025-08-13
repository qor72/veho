async function callStowMutation() {
  const query = `mutation Stow($input: StowInput!) {
  stow(input: $input) {
    success
    message
  }
}`;

  const variables = {
    "input": {
      "palletId": "PAL01",
      "packageIds": ["PKGBADDATA"
      ],
      "stowedOn": 8675309
    }
  };

  const response = await fetch('http://localhost:4000/graphql', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query, variables })
  });

  const data = await response.json();

  // console.log(data);
  console.log(`Success: ${data.data.stow.success}`);
  console.log(`Message: ${data.data.stow.message}`);
}

callStowMutation().catch(console.error);
