import typeDefs from "../src/schema";
import { mockServer } from "graphql-tools";

describe("check schemas type definitions", () => {
  test("has valid typeDefs", async () => {
    expect(async () => {
      // @ts-ignore
      const MockServer = mockServer(typeDefs);
      await MockServer.query(`{__schema{types{name}}}`);
    }).not.toThrow();
  });
});
