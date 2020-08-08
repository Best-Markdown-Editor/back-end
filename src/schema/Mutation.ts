const mutationTypes = `
  type Mutation {
    login(data: UserInput!): User!
    editUser(data: UserInput!): User!
    addFile(data: NewFileInput!): File!
    editFile(data: EditFileInput!): File!
    deleteFile(id: ID!): Boolean!
    publishFile(data: PubFileInput!): Pub!
    unPublishFile(id: ID!): Boolean!
    subUser(id: ID!): User!
    unSubUser(id: ID!): User!
    addFolder(data: AddFolderInput!): Folder!
    editFolder(data: EditFolderInput!): Folder!
    deleteFolder(id: ID!): Boolean!
    addPubToFolder(data: PubToFolderInput!): Boolean!
    unPubToFolder(data: PubToFolderInput!): Boolean!
    regenToken(id: ID!): User!
  }
  input UserInput {
    id: ID!
    username: String!
    email: String!
    avatar: String
    subscriber: Boolean
  }
  input EditFileInput {
    id: ID!
    title: String!
    body: String!
  }
  input NewFileInput {
    title: String!
    userId: String!
    body: String!
  }
  input PubFileInput {
    id: ID!
    userId: String!
    description: String!
    thumbnail: String
  }
  input AddFolderInput {
    userId: String!
    name: String!
  }
  input EditFolderInput {
    id: ID!
    name: String!
  }
  input PubToFolderInput {
    pubId: Int!
    folderId: Int!
  }
`;

export default mutationTypes;
