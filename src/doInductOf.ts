const { db } = require('./persistance');
const { PackageStates } = require('./packageStates');

type InductionResult = {
    packageId: string;
    success: boolean;
    message: string;
};

function do_induct_of(input: { packageId: string; receivingWarehouseId: string; receivedOn: number }): InductionResult {

    var result: InductionResult = {
        success: false,
        message: "",
        packageId: input.packageId
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

    if (thePackage.status !== PackageStates.READY) {
        result.message = `Package with ID ${input.packageId} is not in READY status and cannot be inducted. Current status: ${thePackage.status}.`;
        return result;
    }

    // Intentionally not checking Package's existing Warehouse ID; if the state has been altered, let it be updated

    thePackage.status = PackageStates.INDUCTED;
    thePackage.receivedOn = input.receivedOn;
    thePackage.receivingWarehouseID = input.receivingWarehouseId;
    packages.update(thePackage);

    result.success = true;
    result.message = `Succesfully inducted package ${input.packageId} into warehouse ${input.receivingWarehouseId}`;
    return result;
}

module.exports = { do_induct_of };
