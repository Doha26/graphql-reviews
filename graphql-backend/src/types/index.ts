export interface User {
    id: number
    name: string
    phone: string,
    email: string,
    home_address: string,
    gender: Gender,
    picture_url: string,
}

export interface Review {
    id:number
    rate: number
    reviewer: string
    assigned_to: string
    title: string
    content: string
    created_at: string
    public_url: string
}

export interface UsersAndReviewsResponse {
    users: Array<User>,
    reviews: Array<Review>
}


export enum Gender {
    Male,
    Female
}
