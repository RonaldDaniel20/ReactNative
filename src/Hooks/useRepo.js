//import { useQuery } from "@apollo/client/react"
import { useLazyQuery } from "@apollo/client/react";
import { GET_REPOSITORIES } from "../graphql/queries"

const useRepo = () => {

    const [getRepositories, { loading, error, data}] = useLazyQuery(GET_REPOSITORIES,
        {fetchPolicy: 'cache-and-network'}
    );



    const fetchRepositories = async ({ orderBy, orderDirection }) => {

        const request = await getRepositories({
            variables: {
                orderBy,
                orderDirection
            }
        })

    }

    return [data, loading, error, fetchRepositories]
}

export default useRepo;