import {Context} from "vm";
import {User, UsersAndReviewsResponse} from "../types";

export default {
    Query: {
        users: async (parent: unknown, args: unknown, {dataSources}: Context) => {
            const usersAndReviews : UsersAndReviewsResponse = await dataSources.userRestAPI.getUsersAndReviews();
            return usersAndReviews.users.map((user: User) => ({
                ...user,
                score: dataSources.userRestAPI.getUserScore(user.email, usersAndReviews.reviews)
            }));
        },
        welcome: (): string => 'Welcome to this Graphql Backend',
    },
}
