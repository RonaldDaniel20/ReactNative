import { useQuery } from "@apollo/client/react";
import { GET_REVIEWS } from "../graphql/queries";


const useReview = ( id, first = 4, after = '' ) => {
    const { loading, error, data } = useQuery(GET_REVIEWS, {
                                                            variables: { 
                                                                id,
                                                                first,
                                                                after
                                                             },
                                                            fetchPolicy: 'cache-and-network'
                                                        });

    return { loading, error, data }
}

export default useReview;