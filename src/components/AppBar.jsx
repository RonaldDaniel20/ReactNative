import React from "react";
import { View, 
         StyleSheet, 
         Text, 
         TouchableWithoutFeedback,
         ScrollView

 } from "react-native";

import Constants from 'expo-constants';
import { Link } from "react-router-native";

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
    return (
        <View style = {styles.container}>
            <ScrollView horizontal={true}>
                <TouchableWithoutFeedback>
                    <View style = {styles.containerNabvar}>
                        <Link to='/'>
                            <Text style = {styles.text}>
                                Repositories
                            </Text>
                        </Link>
                        <Link to = 'SignIn'>
                            <Text style = {styles.text}>
                                Sig In
                            </Text>            
                        </Link>
                    </View>
                </TouchableWithoutFeedback>
            </ScrollView>
        </View>
    )
}

export default AppBar;
