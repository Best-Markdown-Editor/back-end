const typeDefs = `
  type Query {
    getPubFiles: [Pub]!
    getPubFileBySlug(slug: String!): Pub!
    getPubFileById(id: ID!): Pub!
    getFilesInFolderByName(name: String!): [Pub!]!
    getFilesInFolderById(folderId: Int!): [Pub!]!
    getUserFolders: [Folder!]!
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
    files: [Pub]!
  }
`;

export default typeDefs;
