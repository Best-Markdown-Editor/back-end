import queryTypes from "./Query";
import tableTypes from "./Table";
import mutationTypes from "./Mutation";

const typeDefs = `
  ${queryTypes},
  ${tableTypes},
  ${mutationTypes},
`;

export default typeDefs;
