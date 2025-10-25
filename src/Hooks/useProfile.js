import { useQuery } from "@apollo/client/react";
import { GET_ME } from "../graphql/queries";

const useProfile = ( review = false ) => {
    const { data, loading, error } = useQuery(GET_ME, {
        variables: {
            includeReviews: review
        }
    })

    return [data, loading, error];
}

export default useProfile;