import { useContext } from "react";

import { useMutation } from "@apollo/client/react"
import { useApolloClient } from "@apollo/client/react";
import { AUTHENTICATE } from "../graphql/mutations"
import AuthStorageContext from "../context/AuthStorageContext";


const useSignIn = () => {

    const [authenticate, {data, loading, error}] = useMutation(AUTHENTICATE);
    const authStorage = useContext(AuthStorageContext);

    const client = useApolloClient();


    const signIn = async ({username, password}) => {

        const result = await authenticate({
            variables: { credentials: { username, password }}
        });

        const token =result.data.authenticate.accessToken;
        if(!token) throw new Error('No access token returned');


        await authStorage.setAccessToken(token);
        await client.resetStore();
    }

    return [signIn, data, loading, error]
}

export default useSignIn;