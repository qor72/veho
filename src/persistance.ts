const Loki = require('lokijs');

// Create a new in memory database each time
const db = new Loki('veho.db', { autoload: false, autosave: false });

const rightNowTimestamp = Math.floor(Date.now() / 1000);

// Packages
const packages = db.getCollection('packages') || db.addCollection('packages', { unique: ['packageId'] });
packages.insert([
    { packageId: 'PKGREADY', description: 'Ready Package', status: "READY", receivedOn: 0, receivingWarehouseID: null, palletId: null },
    { packageId: 'PKGINDUCTED', description: 'Already Inducted', status: "INDUCTED", receivedOn: rightNowTimestamp, receivingWarehouseID: "WH01", palletId: null },
    { packageId: 'PKGSTOWED', description: 'Stowed somewhere', status: "STOWED", receivedOn: rightNowTimestamp, receivingWarehouseID: "WH01", palletId: 'PAL02' },
    { packageId: 'PKGBADDATA', description: 'Stowed somewhere', status: "INDUCTED", receivedOn: rightNowTimestamp, receivingWarehouseID: "WH01", palletId: 'PAL02' },
]);

// Pallets
const pallets = db.getCollection('pallets') || db.addCollection('pallets', { unique: ['palletId'] });
pallets.insert([
    { palletId: 'PAL01', description: 'Pallet 1', stowedOn: 0, packageIds: [] },
    { palletId: 'PAL02', description: 'Pallet 1', stowedOn: 0, packageIds: ["PKGSTOWED"] },
]);

module.exports = { db };