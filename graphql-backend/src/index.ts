import { env } from './env';
import {ApolloServer}  from 'apollo-server';
import typeDefs from './schema/index';
import resolvers from './resolvers/index';
import UserRestAPI  from  './datasources/user';

const server = new ApolloServer({
    typeDefs,
    resolvers,
    introspection: env.apollo.introspection,
    playground: env.apollo.playground,
    dataSources: () => ({
        userRestAPI: new UserRestAPI()
    })
});

server.listen().then(() => {
    console.log(`
    Server is running!
    Litening on port ${env.port}
    Explore at https://studio.apollographql.com/dev
    `)
})
