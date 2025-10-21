import { gql } from "@apollo/client";

export const GET_REPOSITORIES = gql `
    query Repositories {
        repositories {
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
    query ME {
        me {
            id
            username
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
    query Reviews($id: ID!){
        repository(id: $id){
            id
            fullName
            reviews {
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
                }
            }
        }
    }


`