const Loki = require('lokijs');

// Create a new in memory database each time
const db = new Loki('veho.db', { autoload: false, autosave: false });

// Initialize collections
const packages = db.getCollection('packages') || db.addCollection('packages', { unique: ['packageId'] });
const pallets = db.getCollection('pallets') || db.addCollection('pallets', { unique: ['palletId'] });

const rightNowTimestamp = Math.floor(Date.now() / 1000);

// Packages default data
packages.insert([
    { packageId: 'PKGREADY', description: 'Ready Package', status: "READY", receivedOn: 0, receivingWarehouseID: null },
    { packageId: 'PKGINDUCTED', description: 'Already Inducted', status: "INDUCTED", receivedOn: rightNowTimestamp, receivingWarehouseID: "WH01" },
    { packageId: 'PKGSTOWED', description: 'Stowed somewhere', status: "STOWED", receivedOn: rightNowTimestamp, receivingWarehouseID: "WH01" },
])

// TODO Pallets default data

module.exports = db;
