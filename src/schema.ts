const { buildSchema } = require('graphql');

const schema = buildSchema(`
  input InductInput {
    packageId: ID!,
    receivingWarehouseId: ID!,
    receivedOn: Int! # Yup, 2038 bug. Could do our own Date scalar
  }

  input StowInput {
    value: String!
  }

  # Empty root query to satisfy GraphQL requirement
  type Query {
    _empty: String
  }

  type Mutation {
    stow(input: StowInput!): String!
    induct(input: InductInput!): String!
  }
`);

module.exports = { schema };
