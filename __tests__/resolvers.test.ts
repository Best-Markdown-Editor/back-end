import { ApolloServer } from "apollo-server-express";

import { createTestClient } from "apollo-server-testing";

import typeDefs from "../src/schema";
import resolvers from "../src/resolvers";

import db from "../src/data/dbConfig";

// eslint-disable-next-line
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

const helloQuery = `
  query($name: String) {
    hello(name: $name)
  }
`;

const usersQuery = `
  query {
    users {
      id
      username
      email
    }
  }
`;

describe("Hello query 👋", () => {
  it("Runs hello query 🤗", async () => {
    const { query } = createTestClient(server);
    const noArg = await query({
      query: helloQuery,
    });

    expect(noArg).toMatchObject({
      data: {
        hello: "Hello, world!",
      },
    });
  });

  it("Runs hello query with an argument 🤗", async () => {
    const { query } = createTestClient(server);

    const withArg = await query({
      query: helloQuery,
      variables: {
        name: "Jim",
      },
    });

    expect(withArg).toMatchObject({
      data: {
        hello: "Hello, Jim!",
      },
    });
  });
});

describe("Users Resolvers 🕺", () => {
  it("Gets all users 👯", async () => {
    const { query } = createTestClient(server);
    const res = await query({
      query: usersQuery,
    });

    expect(res).toMatchObject({
      data: {
        users: [
          {
            id: "1",
            username: "TestUser",
            email: "testUser@gmail.com",
          },
        ],
      },
    });
  });
});
