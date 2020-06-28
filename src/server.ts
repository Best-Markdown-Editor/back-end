import { ExpressContext } from "./types/index";
import { redis } from "./redis";
import Express from "express";

import { ApolloServer } from "apollo-server-express";

import typeDefs from "./schema";
import resolvers from "./resolvers";

import session from "express-session";
import connectRedis from "connect-redis";

import cors from "cors";

require("dotenv").config();

const app = Express();

const RedisStore = connectRedis(session);

interface Options {
  store: connectRedis.RedisStore;
  name: string;
  secret: string;
  resave: boolean;
  saveUninitialized: boolean;
  cookie: any;
}

const sessionOptions: Options = {
  store: new RedisStore({
    client: redis,
  }),
  name: "qid",
  secret: String(process.env.SECRET),
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 1000 * 60 * 60 * 24 * 7 * 365, // 7 years
    sameSite: true,
  },
};

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
  context: ({ req, res }: ExpressContext): ExpressContext => ({
    req,
    res,
  }),
});

app.use(
  cors({
    credentials: true,
    origin: process.env.CORS_ORIGIN,
  })
);

app.use(session(sessionOptions));

server.applyMiddleware({ app, cors: false });

const port = process.env.PORT;

app.listen(port, () => console.log(`Server is running on port ${port}! 🚀`));
