"use strict";
var ApolloServer = require('apollo-server').ApolloServer;
var typeDefs = require('./schema');
var resolvers = require('./resolvers');
var userAPI = require('./datasources/user');
var server = new ApolloServer({
    typeDefs: typeDefs,
    resolvers: resolvers,
    dataSources: function () { return ({
        itemAPI: new userAPI()
    }); }
});
server.listen().then(function () {
    console.log("\n    Server is running!\n    Litening on port 4000\n    Explore at https://studio.apollographql.com/dev\n    ");
});
