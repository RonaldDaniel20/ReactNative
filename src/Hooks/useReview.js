import { useQuery } from "@apollo/client/react";
import { GET_REVIEWS } from "../graphql/queries";

const useReview = ( id ) => {
    const { loading, error, data } = useQuery(GET_REVIEWS, {
                                                            variables: { id },
                                                            fetchPolicy: 'cache-and-network'
                                                        });

    return { loading, error, data }
}

export default useReview;