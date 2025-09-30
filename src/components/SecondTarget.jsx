import { View, StyleSheet, Image } from "react-native"
import Text from "./Text"

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        paddingLeft: 5,
        justifyContent: 'space-around'
    },
    stileView: {
        alignItems: 'center'
    }
})

const SecondTarget = ({starts, forks, reviews, Rating}) => {

    const transformNumber = (number, flag) => {
        number = number / 1000;
        const integerNumber = Math.floor(number);
        const floatNumber = number - integerNumber;
        const decimal = Math.round(floatNumber * 10);

        let integerString = integerNumber.toString();
        
        if(decimal !== 0 && flag){
            integerString += '.'+ decimal.toString() + 'k';
        }else if(flag){
            integerString += 'k';
        }
        return integerString;
    }

    return (
        <View style = {styles.container}>
            <View style = {styles.stileView}>
                <Text fontWeight={'bold'}>{transformNumber(starts, true)}</Text>
                <Text color={'textSecondary'}>Starts</Text>
            </View>
            <View style = {styles.stileView}>
                <Text fontWeight={'bold'}>{transformNumber(forks, true)}</Text>
                <Text color={'textSecondary'}>Forks</Text>
            </View>
            <View style = {styles.stileView}>
                <Text fontWeight={'bold'}>{reviews}</Text>
                <Text color={'textSecondary'}>Reviews</Text>
            </View>
            <View style = {styles.stileView}>
                <Text fontWeight={'bold'}>{Rating}</Text>
                <Text color={'textSecondary'}>Rating</Text>
            </View>
        </View>
    )
}

export default SecondTarget;