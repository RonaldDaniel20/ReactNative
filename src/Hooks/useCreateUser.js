import { useMutation } from '@apollo/client';
import { CREATE_USER } from '../graphql/mutations';

const useCreateUser = () => {
    const [ createUser, { data, loading, error}] = useMutation(CREATE_USER);

    const createNewUser = async({ username, password }) => {
        const request = await createUser({
            variables: {
                user: {
                    username,
                    password
                }
            }
        })

        return request;
    }

    return [ createNewUser, data, loading, error ];
}

export default useCreateUser;