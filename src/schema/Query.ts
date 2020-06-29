const queryTypes = `
  type Query {
    hello(name: String): String!
    users: [User!]!
    user(id: ID!): User!
    getFiles(userId: String!): [File!]!
    getFile(id: ID!): File!
    getFileBySlug(data: GetBySlugInput!): File!
  }
  input GetBySlugInput {
    slug: String!
    userId: String!
  }
`;

export default queryTypes;
