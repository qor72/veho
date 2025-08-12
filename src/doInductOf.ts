const db = require('./persistance');

type InductionResult = {
    success: boolean;
    message: string;
};

function do_induct_of(input: { packageId: string; receivingWarehouseId: string; receivedOn: number }): InductionResult {
    var result: InductionResult = {
        success: false,
        message: ""
    };

    const packages = db.getCollection('packages');
    if (!packages) {
        throw new Error("Database 'packages' collection not found");
    }

    var thePackage = packages.by('packageId', input.packageId);

    if (!thePackage) {
        result.message = `Package with ID ${input.packageId} not found. Please ensure the package exists before inducting.`;
        return result;
    }

    if (thePackage.status !== 'READY') {
        result.message = `Package with ID ${input.packageId} is not in READY status and cannot be inducted. Current status: ${thePackage.status}.`;
        return result;
    }

    result.success = true;
    result.message = `Inducted package ${input.packageId} into warehouse ${input.receivingWarehouseId}`;
    return result;
}
module.exports = { do_induct_of };
