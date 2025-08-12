const { db } = require('./persistance');

type StowResult = {
    success: boolean;
    message: string;
};

// Stow aborts if any package cannot be stowed
function stow_packages(input: { palletId: string, stowedOn: number, packageIds: string[] }): StowResult {
    if (input.packageIds.length === 0) {
        return {
            success: false,
            message: "No packages provided for stowing.",
        };
    }

    const packages = db.getCollection('packages');
    if (!packages) {
        throw new Error("Database 'packages' collection not found");
    }
    const pallets = db.getCollection('pallets');
    if (!pallets) {
        throw new Error("Database 'pallets' collection not found");
    }

    var thePallet = pallets.by('palletId', input.palletId);
    if (!thePallet) {
        return {
            success: false,
            message: `Pallet with ID ${input.palletId} not found. Please ensure the pallet exists before stowing packages.`,
        };
    }

    // Really want to verify that packages are in the same warehouse as the pallet.../shrug

    const packagesToStow = packages.find({ 'palletId': { '$in': input.packageIds } });
    if (packagesToStow.length !== input.packageIds.length) {
        const foundPackageIds = packagesToStow.map((p: any) => p.packageId);
        const notFoundPackageIds = input.packageIds.filter(id => !foundPackageIds.includes(id));
        return {
            success: false,
            message: `The following packages are not in the database: ${notFoundPackageIds.join(', ')}. Please ensure all packages exist before stowing.`,
        };
    }

    const notReadyPackages = packagesToStow.filter((p: any) => p.status !== "INDUCTED");
    if (notReadyPackages.length > 0) {
        const notReadyPackageIds = notReadyPackages.map((p: any) => p.packageId);
        return {
            success: false,
            message: `The following packages are not in INDUCTED status and cannot be stowed: ${notReadyPackageIds.join(', ')}.`,
        };
    }

    // Choice: Allowing packages already on this pallet to be "re-stowed" here
    const alreadyOnPallet = packagesToStow.filter((p: any) => p.palletId !== null && p.palletId !== input.palletId);
    if (alreadyOnPallet.length > 0) {
        const alreadyOnPalletIds = alreadyOnPallet.map((p: any) => p.packageId);
        return {
            success: false,
            message: `The following packages are already stowed on a pallet and cannot be stowed again: ${alreadyOnPalletIds.join(', ')}.`,
        };
    }

    // TODO more Tests
    // TODO Update all the tables (Pallets, Packages)

    return {
        success: true,
        message: `Successfully stowed ${input.packageIds.length} packages on pallet ${input.palletId}.`,
    };
}

module.exports = { stow_packages };
