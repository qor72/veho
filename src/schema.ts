const { buildSchema } = require('graphql');

// Using INT as a Date surrogate. Yup, it's a bug in 2038.

const schema = buildSchema(`
  input InductInput {
    packageIds: [ID!]!
    receivingWarehouseId: ID!
    receivedOn: Int!
  }

  type InductItemResult {
    packageId: ID!
    success: Boolean!
    message: String!
    }

  type InductResult {
    success: Boolean!
    itemResults: [InductItemResult!]!
    }

  input StowInput {
    palletId: ID!
    stowedOn: Int!
    packageIds: [ID!]!
  }

  type StowResult {
    success: Boolean!
    message: String!
  }

  # Empty root query to satisfy GraphQL requirement
  type Query {
    _empty: String
  }

  # Required Mutations
  type Mutation {
    stow(input: StowInput!): StowResult!
    induct(input: InductInput!): InductResult!
  }
`);

module.exports = { schema };
