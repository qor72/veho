const Loki = require('lokijs');

const db = new Loki('veho.db', { autoloadCallback: initData, autoload: true });

function initData() {
    // Initialize collections
    const stowCollection = db.getCollection('packages') || db.addCollection('packages');
    const inductCollection = db.getCollection('pallets') || db.addCollection('pallets');

    // TODO Load Data?
}

module.exports = { db };
