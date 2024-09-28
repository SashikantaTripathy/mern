const express = require('express');
const { ApolloServer } = require('apollo-server-express');
require('dotenv').config();
const db = require('./db');
const models = require('./models');
const typeDefs = require('./schema'); // Ensure this file exports typeDefs
const resolvers = require('./resolvers'); // Ensure this file exports resolvers
const jwt = require('jsonwebtoken');
const dbHost = process.env.DB_HOST;
// first require the package at the top of the file
const helmet = require('helmet')
const cors = require('cors');
// add the middleware after app.use(helmet());
const depthLimit = require('graphql-depth-limit');
const { createComplexityLimitRule } = require('graphql-validation-complexity');




if (!dbHost) {
  console.error('DB_HOST environment variable is not set.');
  process.exit(1);
}

db.connect(dbHost);

const port = process.env.PORT || 4000;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  validationRules: [depthLimit(5), createComplexityLimitRule(1000)],
  context: async ({ req }) => {
  // get the user token from the headers
  const token = req.headers.authorization;
  // try to retrieve a user with the token
  const user = await getUser(token);
 // add the db models and the user to the context
 return { models, user };
 }
});
const app = express();
app.use(helmet());
app.use(cors());

server.applyMiddleware({ app, path: '/api' });

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen({ port }, () =>
  console.log(`Server ready at http://localhost:${port}${server.graphqlPath}`)
);
const getUser = token => {
  if(token){
    try{
      return jwt.verify(token,process.env.JWT_SECRET);
    }
    catch(err){
      throw new Error('Session invalid');
    }
  }
}