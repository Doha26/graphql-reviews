import {Review, User} from "../types";
import {getHiddenValueMessage, paginateResults} from "../utils";

const resolvers  =  {
    Query: {
        users: async (parent: any, args: any, {dataSources}: any) => {
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
        user: async (parent: any, {email}: any, {dataSources}: any) => {
            const user = await dataSources.userReviewAPI.getUser(email);
            return {
                ...user,
                score: await dataSources.userReviewAPI.getUserScore(user.email)
            }
        },

        reviews: async (parent: any, {limit = 100, after_id}: any, {dataSources}: any) => {
            const reviews: Array<Review> = await dataSources.userReviewAPI.getReviews();
            const users: Array<User> = await dataSources.userReviewAPI.getUsers();

            const userEmailsArray = users.map((user: User) => {
                return user.email
            }).filter((item: string, index: number, self: string[]) => self.indexOf(item) == index);

            return paginateResults({
                limit,
                after_id,
                results: reviews.filter((rev: Review) => userEmailsArray.includes(rev.assigned_to))
            });
        },
        welcome: (): string => 'Welcome to this Graphql Backend',
    },

    User: {
        reviews: async (user: User, {rate}: any, {dataSources}: any) => {
            return await dataSources.userReviewAPI.getUserReviews(user.email, rate);
        },
        email: async (user: User, args: any, {dataSources}: any) => {
            return getHiddenValueMessage();
        },
        phone: async (user: User, args: any, {dataSources}: any) => {
            return getHiddenValueMessage();
        },
        picture_url: async (user: User, args: any, {dataSources}: any) => {
            return getHiddenValueMessage();
        },
        home_address: async (parent: any, args: any, {dataSources}: any) => {
            return getHiddenValueMessage();
        },
        gender: async (parent: any, args: any, {dataSources}: any) => {
            return `HIDDEN_FIELD`;
        }
    }
}
export default resolvers;
