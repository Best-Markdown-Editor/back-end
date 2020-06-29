const mutationTypes = `
  type Mutation {
    login(data: UserInput!): User!
    editUser(data: UserInput!): User!
    addFile(data: NewFileInput!): File!
    editFile(data: EditFileInput!): File!
    deleteFile(id: ID!): Boolean!
  }
  input UserInput {
    id: ID!
    username: String!
    email: String!
    avatar: String
  }
  input EditFileInput {
    id: ID!
    title: String!
    body: String!
  }
  input NewFileInput {
    title: String!
    userId: String!
  }
`;

export default mutationTypes;
