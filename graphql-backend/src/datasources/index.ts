import {env} from "../env";
import {RESTDataSource} from 'apollo-datasource-rest';
import {Review, User} from "../types";
import {isOneYearOldReview} from "../utils";

export default class UserReviewAPI extends RESTDataSource {
    constructor() {
        super();
        this.baseURL = env.mock_server_url;
    }

    async getUsers(): Promise<Array<User>> {
        const reviews = await this.get('/items');
        return Array.isArray(reviews) ? reviews : [];
    }

    async getUser(email: string): Promise<User | null> {
        const users: Array<User> = await this.getUsers();
        const user = users.find((user: User) => user.email === email)
        return user ? user : null;
    }

    async getUserScore(email: string): Promise<number> {
        const reviews: Array<Review> = await this.getReviews();
        const userReviews = reviews.filter((r: Review) => r.assigned_to === email);
        if (userReviews.length === 0) return 0;
        let sumUserRate = 0;
        userReviews.forEach((rev: Review) => {
            sumUserRate += rev.rate
        })

        // The user score is equal to (total of rates) / number of reviews assigned to the user.
        // rounded at one number after comma
        return parseFloat(((sumUserRate) / userReviews.length).toFixed(1));
    }

    async getUserReviews(email: string, rate?: number): Promise<Array<Review>> {
        // Get all reviews
        const reviews: Array<Review> = await this.getReviews();

        // if filter by rate is required, applu filter
        if (rate) {
            return reviews
                .filter((r: Review) => r.assigned_to === email)
                .filter((r: Review) => r.rate === rate)
                .sort((a, b) => {
                    return (a.created_at < b.created_at) ? -1 : ((a.created_at > b.created_at) ? 1 : 0)
                });
        }

        // else just return without filter by rate
        return reviews
            .filter((r: Review) => r.assigned_to === email)
            .sort((a, b) => {
                //  // Return user reviews from the newest to the oldest
                return (a.created_at < b.created_at) ? -1 : ((a.created_at > b.created_at) ? 1 : 0)
            });
    }

    async getReviews(): Promise<Array<Review>> {
        const reviews = await this.get('/reviews');

        // Skip reviews old of One year (365 days)
        const updateReviews = reviews.filter((r: Review) => !isOneYearOldReview(r.created_at));

        return Array.isArray(updateReviews) ? updateReviews : [];
    }

}
