import { useQuery } from "@apollo/client/react"
import Text from "../components/Text"
import { GET_REPOSITORIES } from "../graphql/queries"

const useRepo = () => {

    const {loading, error, data, refetch } = useQuery(GET_REPOSITORIES,{
                                            fetchPolicy: 'cache-and-network'
                                        }
                                    ); 

    return {data, loading, error, refetch}
}

export default useRepo;