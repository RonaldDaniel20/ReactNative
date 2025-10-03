import React from "react";
import { View, 
         StyleSheet, 
         Text, 
         TouchableWithoutFeedback,
         TouchableOpacity,
         ScrollView

 } from "react-native";

import Constants from 'expo-constants';
import { Link } from "react-router-native";
import { useQuery } from "@apollo/client/react";

import { GET_ME } from "../graphql/queries";
import useSignOut from "../Hooks/useSignOut";
import Loading from "./loading/Loading";



const styles = StyleSheet.create({
    container: {
        paddingTop: Constants.statusBarHeight,
        backgroundColor: '#24292e',
        height: 80,
        justifyContent: 'flex-center',
        paddingLeft: 10
    },
    text: {
        color: 'white',
        fontWeight: 700,
        fontSize: 16
    },

    containerNabvar : {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10
    },
    
})

const AppBar = () => {

    const { loading, error, data } = useQuery(GET_ME);
    const [ signOut ] = useSignOut();

    if(loading){
        return (
            <View>
                <Loading />
            </View>
        )
        
    }

    if(error){
        return (
            <view style={styles.container}>
                <Text>
                    {`Error ${error.message}`}
                </Text>
            </view>
        )
    }

    const signedIn = Boolean(data && data.me);

    return (
        <View style = {styles.container}>
            <ScrollView horizontal={true}>
                    <View style = {styles.containerNabvar}>
                        <Link to='/' >
                            <Text style = {styles.text}>
                                Repositories
                            </Text>
                        </Link>
                        {
                            signedIn ?  
                            <TouchableOpacity onPress={signOut}>
                                <Text style = {styles.text}>
                                    Sig Out
                                </Text>   
                            </TouchableOpacity>                       
                            :
                            <Link to = 'SignIn'>
                                <Text style = {styles.text}>
                                    Sig In
                                </Text>            
                            </Link>
                        }
                    </View>
            </ScrollView>
        </View>
    )
}

export default AppBar;
