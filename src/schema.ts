const { buildSchema } = require('graphql');

const schema = buildSchema(`
  input StowInput {
    value: String!
  }

  input InductInput {
    value: String!
  }

  type Mutation {
    stow(input: StowInput!): String!
    induct(input: InductInput!): String!
  }
`);

module.exports = { schema };
