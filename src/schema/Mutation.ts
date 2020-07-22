const mutationTypes = `
  type Mutation {
    login(data: UserInput!): User!
    editUser(data: UserInput!): User!
    addFile(data: NewFileInput!): File!
    editFile(data: EditFileInput!): File!
    deleteFile(id: ID!): Boolean!
    publishFile(data: PubFileInput!): Pub!
    subUser(id: ID!): User!
    unSubUser(id: ID!): User!
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
`;

export default mutationTypes;
