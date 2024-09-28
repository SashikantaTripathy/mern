const Query = require('./query');
const Mutation = require('./mutation');
const Note = require('./note');
const User = require('./user');
const { GraphQLDateTime } = require('graphql-iso-date');
module.exports = {
 Query,
 Mutation,
 Note,
 User,
 DateTime: GraphQLDateTime
};
//"5c99fb88ed0ca93a517b1d8e"
