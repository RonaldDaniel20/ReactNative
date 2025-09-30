import { useContext } from "react";

import { useMutation } from "@apollo/client/react"
import { AUTHENTICATE } from "../graphql/mutations"

import AuthStorageContext from "../context/AuthStorageContext";


const useSignIn = () => {

    const [authenticate, {data, loading, error}] = useMutation(AUTHENTICATE);
    const authStorage = useContext(AuthStorageContext);


    const signIn = async ({username, password}) => {

        const result = await authenticate({
            variables: { credentials: { username, password }}
        });


        await authStorage.setAccessToken(result.data.authenticate.accessToken);
    }

    return [signIn, data, loading, error]
}

export default useSignIn;