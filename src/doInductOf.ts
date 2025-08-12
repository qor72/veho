const { db } = require('./persistance');

function do_induct_of(input: { packageId: string; receivingWarehouseId: string; receivedOn: number }): string {
    const result = `Inducted: ${input.packageId}, ${input.receivingWarehouseId}, ${input.receivedOn}`;
    return result;
}

module.exports = { do_induct_of };
