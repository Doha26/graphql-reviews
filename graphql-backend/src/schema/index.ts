const {gql} = require('apollo-server')

const graphQlTypeDefs = gql`

    type User {
        id: ID!
        name: String
        phone: String,
        email: String!,
        home_address: String,
        gender: Gender,
        picture_url: String,
        score:Float!
    }

    type Review {
        id:ID!
        rate: Int!
        reviewer: String!
        assigned_to: String
        title: String!
        content: String
        created_at: String!
        public_url: String!
    }

    enum Gender {
        Male
        Female
        Other
    }
    
    type Query {
        reviews(
            pageSize: Int
            after: String
        ):UserConnection!
        users: [User]
        welcome:String
    }

    type UserConnection { # add this below the Query type as an additional type.
        next_cursor: String!
        total: Boolean!
        reviews: [User]!
    }
`;
export default graphQlTypeDefs;
