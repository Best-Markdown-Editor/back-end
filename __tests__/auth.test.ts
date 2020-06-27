import { ApolloServer } from "apollo-server-express";

import { createTestClient } from "apollo-server-testing";

import typeDefs from "../src/schema";
import resolvers from "../src/resolvers";

import db from "../src/data/dbConfig";

let server: any;

beforeAll(async () => {
  server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  await db.migrate.rollback();
  await db.migrate.latest();
  return db.seed.run();
});

afterAll(() => {
  return db.migrate.rollback().then(() => db.destroy());
});

const loginMutation = `
  mutation($data: LoginInput!) {
    login(data: $data) {
      id
      username
      email
    }
  }
`;

const registerMutation = `
  mutation($data: RegisterInput!) {
    register(data: $data) {
      id
      username
      email
    }
  }
`;

describe("Auth Resolvers ☣️", () => {
  it("Logs user in 🏋", async () => {
    const { mutate } = createTestClient(server);
    const res = await mutate({
      mutation: loginMutation,
      variables: {
        data: {
          email: "testUser@gmail.com",
          password: "password",
        },
      },
    });

    // console.log("Login Response:", res);

    expect(res).toMatchObject({
      data: {
        login: {
          id: "1",
          username: "TestUser",
          email: "testUser@gmail.com",
        },
      },
    });
  });

  it("Registers user in 📚", async () => {
    const { mutate } = createTestClient(server);
    const res = await mutate({
      mutation: registerMutation,
      variables: {
        data: {
          email: "newUser@gmail.com",
          username: "NewUser",
          password: "password",
        },
      },
    });

    console.log("Register Response:", res);

    res;

    expect(res).toMatchObject({
      data: {
        register: {
          id: "2",
          username: "NewUser",
          email: "newUser@gmail.com",
        },
      },
    });
  });
});
