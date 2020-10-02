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
    context: {
      req: {
        session: {
          userId: 1,
        },
      },
    },
  });

  await db.migrate.rollback();
  await db.migrate.latest();
  return db.seed.run();
});

afterAll(() => {
  return db.migrate.rollback().then(() => db.destroy());
});

const getFilesQuery = `
  query ($userId: String!) {
    getFiles(userId: $userId) {
      id
      title
      slug
      body
    }
  }
`;

const addNewFileMutation = `
  mutation ($data: NewFileInput!) {
    addFile(data: $data) {
      id
      title
      slug
      body
    }
  }
`;

const editFileMutation = `
  mutation ($data: EditFileInput!) {
    editFile(data: $data) {
      id
      title
      slug
      body
    }
  }
`;

const deleteFileMutation = `
  mutation ($id: ID!) {
    deleteFile(id: $id)
  }
`;

describe("File Resolvers 🗄", () => {
  it("Gets all users files 🗃", async () => {
    const { query } = createTestClient(server);

    const res = await query({
      query: getFilesQuery,
      variables: {
        userId: "OpXrOo1X72fQkg6bkFSj5i2dokl1",
      },
    });

    console.log("Get Files Response:", res);

    expect(res).toMatchObject({
      data: {
        getFiles: [
          {
            id: "1",
            title: "This File",
            slug: "this-file",
            body: "",
          },
          {
            id: "2",
            title: "That File",
            slug: "that-file",
            body: "",
          },
          {
            id: "3",
            title: "Any File",
            slug: "any-file",
            body: "",
          },
        ],
      },
    });
  });

  it("Adds a new file 📁", async () => {
    const { mutate } = createTestClient(server);
    const res = await mutate({
      mutation: addNewFileMutation,
      variables: {
        data: {
          title: "My new file!",
          userId: "OpXrOo1X72fQkg6bkFSj5i2dokl1",
          body: "This is a body.",
        },
      },
    });

    res;

    expect(res).toMatchObject({
      data: {
        addFile: {
          id: "4",
          title: "My new file!",
          slug: "my-new-file",
          body: "This is a body.",
        },
      },
    });
  });

  it("Edits a file 📂", async () => {
    const { mutate } = createTestClient(server);
    const res = await mutate({
      mutation: editFileMutation,
      variables: {
        data: {
          id: 4,
          title: "New Tile For-for Post Two!",
          body: "newest body of text",
        },
      },
    });

    expect(res).toMatchObject({
      data: {
        editFile: {
          id: "4",
          title: "New Tile For-for Post Two!",
          slug: "new-tile-for-for-post-two",
          body: "newest body of text",
        },
      },
    });
  });

  it("Deletes a file 💀", async () => {
    const { mutate } = createTestClient(server);
    const res = await mutate({
      mutation: deleteFileMutation,
      variables: {
        id: 4,
      },
    });

    console.log(res);

    expect(await res.data?.deleteFile).toBeTruthy();
  });
});
