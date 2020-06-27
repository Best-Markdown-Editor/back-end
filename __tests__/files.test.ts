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
  query {
    getFiles {
      id
      title
      slug
      body
    }
  }
`;

const addNewFileMutation = `
  mutation ($title: String!) {
    addFile(title: $title) {
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
  mutation ($title: String!) {
    deleteFile(title: $title)
  }
`;

describe("File Resolvers 🗄", () => {
  it("Gets all users files 🗃", async () => {
    const { query } = createTestClient(server);

    const res = await query({
      query: getFilesQuery,
    });

    console.log("Get Files Response:", res);

    expect(res).toMatchObject({
      data: {
        getFiles: [
          {
            id: "3",
            title: "Any File",
            slug: "any-file",
            body: "",
          },
          {
            id: "2",
            title: "That File",
            slug: "that-file",
            body: "",
          },
          {
            id: "1",
            title: "This File",
            slug: "this-file",
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
        title: "My new file!",
      },
    });

    // console.log("Add New File Response:", res);

    res;

    expect(res).toMatchObject({
      data: {
        addFile: {
          id: "4",
          title: "My new file!",
          slug: "my-new-file",
          body: "",
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

    // console.log("Edit File Response:", res);

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
        title: "New Tile For-for Post Two!",
      },
    });

    // console.log("Edit File Response:", res);

    expect(await res.data?.deleteFile).toBeTruthy();
  });
});
