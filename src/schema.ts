const { buildSchema } = require('graphql');

const schema = buildSchema(`
  input InductInput {
    packages: [ID!]!
    receivingWarehouseId: ID!
    receivedOn: Int! # Yup, 2038 bug. Could do our own Date scalar
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
    value: String!
  }

  # Empty root query to satisfy GraphQL requirement
  type Query {
    _empty: String
  }

  type Mutation {
    stow(input: StowInput!): String!
    induct(input: InductInput!): InductResult!
  }
`);

module.exports = { schema };
