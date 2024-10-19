const express = require('express');
const { ApolloServer } = require('apollo-server-express');
require('dotenv').config();
const models = require('./models');
const typeDefs = require('./schema'); // Ensure this file exports typeDefs
const resolvers = require('./resolvers'); // Ensure this file exports resolvers
const jwt = require('jsonwebtoken');
const helmet = require('helmet')
const cors = require('cors');
const depthLimit = require('graphql-depth-limit');
const { createComplexityLimitRule } = require('graphql-validation-complexity');
const mongoose = require('mongoose');

const port = process.env.PORT || 4000;

const app = express();
mongoose.connect(`mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.qbjjt.mongodb.net/?retryWrites=true&w=majority&appName=${process.env.MONGO_DB}`).then(() => {app.listen(port);}).catch(err => (console.log(mongoose.Error)))
app.use(helmet());
app.use(cors());





