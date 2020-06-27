const mutationTypes = `
  type Mutation {
    login(data: LoginInput!): User!
    register(data: RegisterInput!): User!
    logout: Boolean!
    addFile(title: String!): File!
    editFile(data: EditFileInput!): File!
    deleteFile(title: String!): Boolean!
  }
  input LoginInput {
    email: String!
    password: String!
  }
  input RegisterInput {
    email: String!
    username: String!
    password: String!
  }
  input EditFileInput {
    id: ID!
    title: String!
    body: String!
  }
`;

export default mutationTypes;
