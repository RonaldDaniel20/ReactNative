import { View, StyleSheet, ActivityIndicator } from "react-native";
import Constants from 'expo-constants';

const style = StyleSheet.create({
    container: {
        display: 'flex',
        backgroundColor: 'white',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 50,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: Constants.statusBarHeight,
    },
})


const Loading = () => {

    return (
        <View style = {style.container}>
            <ActivityIndicator size={'large'} color={'#00ff00'}/>
        </View>
    )
}

export default Loading;