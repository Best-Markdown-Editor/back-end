const queryTypes = `
  type Query {
    hello(name: String): String!
    users: [User!]!
    user(id: ID!): User!
    getFiles(userId: String!): [File!]!
    getFile(id: ID!): File!
    getFileBySlug(data: GetBySlugInput!): File!
    getPubFileBySlug(data: GetBySlugInput!): Pub!
    isSubscribed(id: ID!): Boolean!
    getFolder(id: ID!): Folder!
    getFolders(userId: ID!): [Folder!]!
    getPubFiles(userId: ID!): [Pub!]!
    getPubFile(id: ID!): Pub!
    isFilePub(id: ID!): Boolean!
    getFilesInFolderByName(data: GetFilesInFolderByNameInput!): [Pub!]!
    getFilesInFolderById(id: ID!): [Pub!]!
    getUserFolders(userId: String!): [Folder!]!
  }
  input GetBySlugInput {
    slug: String!
    userId: String!
  }
  input GetFilesInFolderByNameInput {
    name: String!
    userId: String!
  }
`;

export default queryTypes;
