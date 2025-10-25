import { gql } from "@apollo/client";

export const AUTHENTICATE = gql`
    mutation Authenticate($credentials: AuthenticateInput!){
        authenticate(credentials: $credentials){
            accessToken,
            user {
                id
                username
            }
        }
    }
`

export const CREATE_REVIEW = gql`
    mutation CreateReview($review: CreateReviewInput!){
        createReview(review: $review){
            id,
            repositoryId
        }
    }
`

export const CREATE_USER = gql`
    mutation CreateUser($user: CreateUserInput!){
        createUser(user: $user){
            username        
        }
    }
`

export const DELETE_REVIEW = gql`
    mutation DeleteReview($deleteReviewId: ID!) {
        deleteReview(id: $deleteReviewId)
    }
`
