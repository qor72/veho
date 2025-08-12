const Loki = require('lokijs');

// Create a new in memory database each time
const db = new Loki('veho.db', { autoload: false, autosave: false });

// Initialize collections
const packages = db.getCollection('packages') || db.addCollection('packages', { unique: ['packageId'] });
const pallets = db.getCollection('pallets') || db.addCollection('pallets', { unique: ['palletId'] });

// TODO Load Data?

console.log(db.listCollections());

module.exports = db;
