import {Context} from "vm";
import {Review, User} from "../types";
import paginateResults from "../utils";

export default {
    Query: {
        users: async (parent: any, args: any, {dataSources}: Context) => {
            const users: Array<User> = await dataSources.userReviewAPI.getUsers();
            let usersWithReviews: Array<User> = [];
            // Return only users with at least one review
            for (const u of users) {
                const userReviews = await dataSources.userReviewAPI.getUserReviews(u.email)
                if (userReviews.length > 0) {
                    usersWithReviews.push(u)
                }
            }
            return usersWithReviews.map(async (user: User, index: number) => ({
                ...user,
                score: await dataSources.userReviewAPI.getUserScore(user.email),
                reviews: await dataSources.userReviewAPI.getUserReviews(user.email)
            }));

        },
        user: async (parent: any, {email}: any, {dataSources}: Context) => {
            const user = await dataSources.userReviewAPI.getUser(email);
            return {
                ...user,
                score: await dataSources.userReviewAPI.getUserScore(user.email)
            }
        },

        reviews: async (parent: any, {limit = 100, after_id}: any, {dataSources}: Context) => {
            const allReviews: Array<Review> = await dataSources.userReviewAPI.getReviews();

            return paginateResults({
                limit,
                after_id,
                results: allReviews
            });
        },
        welcome: (): string => 'Welcome to this Graphql Backend',
    },

    User: {
        reviews: async (user: User, {rate}: any, {dataSources}: Context) => {
            return await dataSources.userReviewAPI.getUserReviews(user.email, rate);
        },
        email: async (user: User, {rate}: any, {dataSources}: Context) => {
            return `<hidden field according to requirements>`;
        },
        phone: async (user: User, {rate}: any, {dataSources}: Context) => {
            return `<hidden field according to requirements>`;
        },
        picture_url: async (user: User, {rate}: any, {dataSources}: Context) => {
            return `<hidden field according to requirements>`;
        },
        home_address: async (parent: any, args: any, {dataSources}: Context) => {
            return `<hidden field according to requirements>`;
        },
        gender: async (parent: any, args: any, {dataSources}: Context) => {
            return `HIDDEN_FIELD`;
        }
    }
}
