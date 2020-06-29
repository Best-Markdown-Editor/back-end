const tableTypes = `
  type User {
    id: ID!
    username: String!
    email: String!
    avatar: String!
  }
  type File {
    id: ID!
    title: String!
    slug: String!
    body: String!
    date: String!
    updatedAt: String!
  }
`;

export default tableTypes;
