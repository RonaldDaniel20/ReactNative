import { useQuery } from "@apollo/client/react";
import { GET_REPOSITORY } from "../graphql/queries";

const useUniqueRepo = ( id ) => {
    const {loading, error, data, refetch } = useQuery(GET_REPOSITORY,{
                                                variables: { id },
                                                fetchPolicy: 'cache-and-network'
                                            });
    return {data, loading, error, refetch};
}

export default useUniqueRepo;
