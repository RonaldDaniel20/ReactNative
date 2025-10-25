import { gql } from "@apollo/client";

export const GET_REPOSITORIES = gql `
    query Repositories($orderBy: AllRepositoriesOrderBy, $orderDirection: OrderDirection, $searchKeyword: String) {
        repositories(orderBy: $orderBy, orderDirection: $orderDirection, searchKeyword: $searchKeyword) {
            edges {
                node 
                {
                    id
                    name
                    ownerName
                    createdAt
                    fullName
                    reviewCount
                    ratingAverage
                    forksCount
                    stargazersCount
                    description
                    language
                    ownerAvatarUrl
                    url
                }
            }
        }
    }
`

export const GET_ME = gql `
    query getCurrentUser($includeReviews: Boolean = false) {
        me {
            id
            username
            reviews @include(if: $includeReviews){
                edges {
                    node {
                        text
                        createdAt
                        user {
                            username
                        }
                    }
                }
            }
        }
    }
`

export const GET_REPOSITORY = gql `
    query Repository($id: ID!){
        repository(id: $id){
            id
            ownerName
            createdAt
            fullName
            reviewCount
            ratingAverage
            forksCount
            stargazersCount
            description
            language
            ownerAvatarUrl
            url        
        }
    }
`

export const GET_REVIEWS = gql`
    query Reviews($id: ID!, $first: Int, $after: String){
        repository(id: $id){
            id
            fullName
            reviews(first: $first, after: $after){
                edges {
                    node {
                        id
                        text
                        rating
                        createdAt
                        user {
                            id
                            username
                        }
                    }
                    cursor
                }
                totalCount
                pageInfo {
                    startCursor
                    endCursor
                    hasNextPage
                }
            }
        }
    }
`
