import {gql} from 'apollo-server'

const graphQlTypeDefs = gql`

    type User {
        id: ID!
        name: String
        phone: String,
        email: String,
        home_address: String,
        gender: Gender,
        picture_url: String,
        score:Float,
        reviews(rate:Int):[Review]
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
        HIDDEN_FIELD
    }

    type Query {
        reviews(
            limit: Int
            after_id: Int
        ):ReviewsResponse!
        users: [User]
        user(email:String!):User,
        welcome:String
    }

    type ReviewsResponse {
        next_cursor: Int!
        total: Int!
        reviews: [Review]!
    }
`;
export default graphQlTypeDefs;
