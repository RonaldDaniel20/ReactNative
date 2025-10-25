import { useQuery } from "@apollo/client/react";
import { GET_REVIEWS } from "../graphql/queries";


const useReview = ( id, first = 6, after = '' ) => {
    const { loading, error, data, fetchMore } = useQuery(GET_REVIEWS, {
                                                            variables: { 
                                                                id,
                                                                first,
                                                                after
                                                             },
                                                            fetchPolicy: 'cache-and-network'
                                                        });

    const handleFetchMore = () => {
        
        const canFetchMore = !loading && data && data.repository.reviews.pageInfo.hasNextPage;

        if(!canFetchMore) return;

        fetchMore({
            query: GET_REVIEWS,
            variables: {
                id,
                first,
                after: data.repository.reviews.pageInfo.endCursor
            },
            updateQuery(previousResult, { fetchMoreResult }){
                const nextResult = {
                    repository: {
                        ...fetchMoreResult.repository,
                        reviews: {
                            ...fetchMoreResult.repository.reviews,
                            edges: [
                                ...previousResult.repository.reviews.edges,
                                ...fetchMoreResult.repository.reviews.edges
                            ]
                        }
                    }
                }

                return nextResult;
            }
        })


    }

    return { loading, error, data, handleFetchMore }
}

export default useReview;