import Express from "express";

import { ApolloServer } from "apollo-server-express";

import typeDefs from "./schema";
import resolvers from "./resolvers";
import cmsTypeDefs from "./cms/gql/schema";
import cmsResolvers from "./cms/gql/resolvers";
import restRouter from "./cms/rest";

import cors from "cors";
import { ExpressContext } from "apollo-server-express/dist/ApolloServer";

// Build out folders and published files feature.

require("dotenv").config();

const app = Express();

const welcomeMessage = `
<body style="display: flex; flex-direction: column; align-items: center;">
  <h1>Server is up and running!</h1>
  <p>Best Markdown Content Management System GraphQL API is located at <a href="/cms">/cms</a></p>
</body>
`;

app.get("/", async (_, res) => {
  res.send(welcomeMessage);
});

app.use('/api', cors(), restRouter);

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const cmsAPI = new ApolloServer({
  typeDefs: cmsTypeDefs,
  resolvers: cmsResolvers,
  introspection: true,
  playground: true,
  context: ({ req, res }: ExpressContext): ExpressContext => ({
    req,
    res,
  }),
});

// app.use(cors());

server.applyMiddleware({
  app,
  cors: {
    credentials: true,
    origin: process.env.CORS_ORIGIN,
  },
});

cmsAPI.applyMiddleware({
  app,
  cors: {
    credentials: false,
  },
  path: "/cms",
});

const port = process.env.PORT;

app.listen(port, () => console.log(`Server is running on port ${port}! 🚀`));
