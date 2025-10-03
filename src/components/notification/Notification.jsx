import { View, StyleSheet } from "react-native"
import Text from "../Text"
import Constants from 'expo-constants';
import { useEffect, useState } from "react";
import FontAwesome from 'react-native-vector-icons/FontAwesome';



const style = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        borderRadius: 5,
        paddingTop: Constants.statusBarHeight,
        gap: 2,
        margin: 4,
        shadowOpacity: 0.5,
        minWidth: '90%',
        backgroundColor: 'white',
        justifyContent: 'center'
    },

    containerBody:{
        flexDirection: 'column',
        gap: 4
    }

})

const Notification = ({ Titule, description, icon}) => {

    const [visible, setVisible] = useState(false);

    useEffect(() => {
        setVisible(true);
        const timer = setTimeout(() => setVisible(false), 3000);
        return () => clearTimeout();
    }, [])

    if(!visible) return null

    return (
        <View style = {style.container}>
            <View>
                {
                    icon === 'success' ? <FontAwesome name="check" size={30} color={'green'} />
                                    : <FontAwesome name="close" size={30} color={'red'}/>
                }
            </View>
            <View style = {style.containerBody}>
                <View>
                    <Text fontWeight={'bold'}>{Titule}</Text>
                    <Text color={'textSecondary'}>{description}</Text>
                </View>
            </View>
        </View>
    )
}

export default Notification;