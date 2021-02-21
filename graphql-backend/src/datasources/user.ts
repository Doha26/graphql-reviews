import {env} from "../env";
import {RESTDataSource} from 'apollo-datasource-rest';
import {Review, UsersAndReviewsResponse} from "../types";

export default class UserRestAPI extends RESTDataSource {
    constructor() {
        super();
        this.baseURL = env.mock_server_url;
    }

    /*
      This method return a mocked
     */
    async getUsersAndReviews(): Promise<UsersAndReviewsResponse> {
        const users = await this.get('/items');
        const reviews = await this.get('/reviews');
        return {users, reviews};
    }

    async getUserScore(userEmail: string, reviews: Array<Review>): Promise<number> {
        const userReviews = reviews.filter((r: Review) => r.assigned_to === userEmail);
        if(userReviews.length === 0){
            return 0;
        }
        let sumUserRate = 0;
        userReviews.forEach((rev:Review)=>{
            sumUserRate += rev.rate
        })
        // The user score is equal to (total of rates) / number of reviews assigned to the user
        return (sumUserRate) /userReviews.length;
    }

    async getUserReviews(userEmail: string, reviews: Array<Review>): Promise<Array<Review>> {
        // Return user reviews from the newest to the oldest
        return reviews
            .filter((r: Review) => r.assigned_to === userEmail)
            .sort((a, b) => {
                return (a.created_at < b.created_at) ? -1 : ((a.created_at > b.created_at) ? 1 : 0)
            });
    }
}
