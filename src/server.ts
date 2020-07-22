import Express from "express";

import { ApolloServer } from "apollo-server-express";

import typeDefs from "./schema";
import resolvers from "./resolvers";
import cmsTypeDefs from "./cms/schema";
import cmsResolvers from "./cms/resolvers";

import cors from "cors";

// Build out folders and published files feature.

require("dotenv").config();

const app = Express();

const welcomeMessage = `
<body style="display: flex; flex-direction: column; align-items: center;">
  <h1>Server is up and running!</h1>
  <p>The GraphQL API is located at <a href="/graphql">/graphql</a></p>
</body>
`;

app.get("/", async (_, res) => {
  res.send(welcomeMessage);
});

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
  playground: true,
});

const cmsAPI = new ApolloServer({
  typeDefs: cmsTypeDefs,
  resolvers: cmsResolvers,
  introspection: true,
  playground: true,
});

app.use(
  cors({
    credentials: true,
    origin: process.env.CORS_ORIGIN,
  })
);

server.applyMiddleware({
  app,
  cors: {
    credentials: true,
    origin: process.env.CORS_ORIGIN,
  },
});

cmsAPI.applyMiddleware({
  app,
  cors: false,
  path: "/api",
});

const port = process.env.PORT;

app.listen(port, () => console.log(`Server is running on port ${port}! 🚀`));
