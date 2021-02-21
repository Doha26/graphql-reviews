import {env} from "../env";
import {RESTDataSource} from 'apollo-datasource-rest';
import {Review, User, UsersAndReviewsResponse} from "../types";

export default class UserRestAPI extends RESTDataSource {
    constructor() {
        super();
        this.baseURL = env.mock_server_url;
    }

    async getUsersAndReviews(): Promise<UsersAndReviewsResponse> {
        const users = await this.get('/items');
        const reviews = await this.get('/reviews');
        return {users, reviews};
    }

    async getUserScore(userEmail: string, reviews: Array<Review>): Promise<number> {
        const reviewsCount = reviews.filter(r => r.assigned_to === userEmail).length;
        if (reviewsCount === 0) {
            return 0
        }
        const max_score = 5 ; // 5 Represent the max score.
        return reviewsCount * 5 / reviews.length;  // 5 represent the max Score
    }
}
