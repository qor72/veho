async function callInductMutation() {
  const query = `mutation Induct($input: InductInput!) {
  induct(input: $input) {
    success
    itemResults {
      packageId
      success
      message
    }
  }
}`;

  const variables = {
    input: {
      packageIds: ["PKG123", "PKG456", "PKGREADY"],
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

  // console.log(data);
  console.log(`Success: ${data.data.induct.success}`);
  for (const item of data.data.induct.itemResults) {
    console.log(`Package ID: ${item.packageId}, Success: ${item.success}, Message: ${item.message}`);
  }
}

callInductMutation().catch(console.error);
