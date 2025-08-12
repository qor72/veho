const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { schema } = require('./schema');
const { root } = require('./resolvers');
const Loki = require('lokijs');

const db = new Loki('veho.db');
const stowCollection = db.addCollection('stow');
const inductCollection = db.addCollection('induct');

const app = express();

app.use('/graphql', graphqlHTTP({
    schema,
    rootValue: root,
    graphiql: true,
}));

app.listen(4000, () => {
    console.log('🚀 GraphQL server running at http://localhost:4000/graphql');
});
