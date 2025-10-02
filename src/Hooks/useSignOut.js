import { useContext } from "react";
import { useApolloClient } from "@apollo/client/react";
import AuthStorageContext from "../context/AuthStorageContext";
import { useNavigate } from "react-router-native";

const useSignOut = () => {


        const authStorage = useContext(AuthStorageContext);
        const client = useApolloClient();
        const navigate = useNavigate();

        const signOut = async () => {
            try{
                await authStorage.removeAccessToken();
                await client.resetStore();

                navigate('/', {replace: true});
            }catch(e){
                console.error(e);
            }
        }

        return [ signOut ];
}

export default useSignOut;