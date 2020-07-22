const tableTypes = `
  type User {
    id: ID!
    username: String!
    email: String!
    avatar: String!
    subscriber: Boolean!
    token: String
  }
  type File {
    id: ID!
    title: String!
    slug: String!
    body: String!
    date: String!
    updatedAt: String!
  }
  type Pub {
    id: ID!
    title: String!
    slug: String!
    body: String!
    description: String!
    thumbnail: String!
    publishedOn: String!
    updatedAt: String!
  }
  type Folder {
    id: ID!
    name: String!
    files: [File]!
  }
`;

export default tableTypes;
