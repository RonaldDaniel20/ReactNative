import { ActivityIndicator, StyleSheet, View } from "react-native";

const styles = StyleSheet.create({
    containerLoading: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'white',
    },

})


const Loading = () => {

    return (
        <View style={styles.containerLoading}>
            <ActivityIndicator size={'large'} color={'#00ff00'}/>
        </View>
    )
}

export default Loading;