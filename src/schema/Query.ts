const queryTypes = `
  type Query {
    hello(name: String): String!
    users: [User!]!
    getFiles: [File!]!
  }
`;

export default queryTypes;
