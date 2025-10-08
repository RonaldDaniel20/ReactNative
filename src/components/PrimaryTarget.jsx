import { View, StyleSheet, Image } from "react-native"
import Text from "./Text"

const styles = StyleSheet.create({
    container : {
        display: 'flex',
        flexDirection: 'row',
    },
    bodyContainer: {
        flexDirection: 'column',
        paddingLeft: 18,
        paddingRight: 12,
        gap: 8,
        flex: 1
    },

    logo: {
        width: 50,
        height: 50
    },

    flexItem: {
        backgroundColor: '#0366d6',
        alignSelf: 'flex-start',
        paddingVertical: 5,
        paddingHorizontal: 8,
        borderRadius: 5
    },
})

const PrimaryTarget = ({url, titule, description, lenguage}) => {
    
    return (
        <View style = {styles.container}>
            <View>
                <Image 
                    style = {styles.logo}
                    source={{
                        uri: url
                    }}
                />
            </View>
            <View style = {styles.bodyContainer}>
                <Text fontWeight={'bold'} testID = 'fullname'>
                    {titule}
                </Text>
                <Text color={'textSecondary'} testID = 'description'>
                    {description}
                </Text>
                <View style = {styles.flexItem}>
                    <Text style={{color: 'white'}} testID = 'lenguage'>{lenguage}</Text>
                </View>
            </View>
        </View>
    )    
}

export default PrimaryTarget;