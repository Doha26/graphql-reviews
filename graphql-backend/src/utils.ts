import {Review} from "./types";

const paginateResults = ({limit = 20, after_id, results}: { limit: number, after_id: number | null, results: Array<Review> }) => {
    if (limit < 1) {
        return [];
    } else if (limit === undefined) {
        return {reviews: results, next_cursor: null, total: results.length}
    }

    const totalCount = results.length;
    let nextCursor = after_id;
    let startPosition = after_id;
    let reviews = [] as Review[];

    if (!after_id) {
        return {
            reviews: results.slice(0, limit),
            next_cursor: limit + 1,
            total: results.length
        }
    } else {
        const index = results.findIndex((review: Review) => parseInt(String(review.id)) === parseInt(after_id.toString()));
        if (index === -1) {
            throw new Error(`There is no data after ${after_id}`);
        }

        startPosition = index + 1;

        //index + 2 => index + 1 + 1. => index = position of the found id ,
        // first 1 = the next position , the second 1 is because findeIndex() start at 0, so the element at position x, will have index x-1;
        nextCursor = index + 2 + limit;
    }

    // if no after_id (null) , just return the limit values elements
    reviews = results.slice(startPosition, startPosition + limit);

    return {
        reviews,
        next_cursor: nextCursor,
        total: results.length
    }
};

export default paginateResults;
