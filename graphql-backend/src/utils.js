"use strict";
exports.__esModule = true;
exports.isOneYearOldReview = exports.getElapsedTime = exports.getHiddenValueMessage = exports.paginateResults = void 0;
var paginateResults = function (_a) {
    var _b = _a.limit, limit = _b === void 0 ? 20 : _b, after_id = _a.after_id, results = _a.results;
    if (limit < 1) {
        return [];
    }
    else if (limit === undefined) {
        return { reviews: results, next_cursor: null, total: results.length };
    }
    var nextCursor = after_id;
    var startPosition = after_id;
    var reviews = [];
    if (!after_id) {
        return {
            reviews: results.slice(0, limit),
            next_cursor: limit + 1,
            total: results.length
        };
    }
    else {
        var index = results.findIndex(function (review) { return parseInt(String(review.id)) === parseInt(after_id.toString()); });
        if (index === -1) {
            throw new Error("There is no data after " + after_id);
        }
        startPosition = index + 1;
        //index + 2 => index + 1 + 1. => index = position of the found id ,
        // first 1 = the next position , the second 1 is because findeIndex() start at 0, so the element at position x, will have index x-1;
        nextCursor = index + 2 + limit;
    }
    // if no after_id (null) , just return the limit values elements
    reviews = results.slice(startPosition, startPosition + limit);
    return {
        reviews: reviews,
        next_cursor: nextCursor,
        total: results.length
    };
};
exports.paginateResults = paginateResults;
var getHiddenValueMessage = function () {
    return "<hidden field according to requirements>";
};
exports.getHiddenValueMessage = getHiddenValueMessage;
var getElapsedTime = function (date) {
    var todayTime = new Date().getTime();
    var createdAtTime = new Date(date).getTime();
    var timeDiffInDays = todayTime - createdAtTime;
    return Math.floor(timeDiffInDays / (1000 * 3600 * 24));
};
exports.getElapsedTime = getElapsedTime;
var isOneYearOldReview = function (date) {
    return exports.getElapsedTime(date) >= 365;
};
exports.isOneYearOldReview = isOneYearOldReview;
