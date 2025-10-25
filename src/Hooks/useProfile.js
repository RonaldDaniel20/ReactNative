import { useQuery } from "@apollo/client/react";
import { GET_ME } from "../graphql/queries";

const useProfile = ( review = false ) => {
    const { data, loading, error, refetch } = useQuery(GET_ME, {
        variables: {
            includeReviews: review
        },
        fetchPolicy: 'cache-and-network'
    })

    return [data, loading, error, refetch];
}

export default useProfile;