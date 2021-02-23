import { env } from './env';
import {ApolloServer}  from 'apollo-server';
import typeDefs from './schema/index';
import resolvers from './resolvers/index';
import UserReviewAPI  from  './datasources/userReview';

const server = new ApolloServer({
    typeDefs,
    resolvers,
    introspection: env.apollo.introspection,
    playground: env.apollo.playground,
    dataSources: () => ({
        userReviewAPI: new UserReviewAPI()
    })
});

server.listen().then(() => {
    console.log(`
    Server is running!
    Litening on port ${env.port}
    Explore at http://localhost:4000
    `)
})
