const queryTypes = `
  type Query {
    hello(name: String): String!
    users: [User!]!
    getFiles: [File!]!
    getFile(slug: String!): File!
    isAuth: Boolean!
  }
`;

export default queryTypes;
