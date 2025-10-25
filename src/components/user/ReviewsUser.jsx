import { View, StyleSheet, FlatList } from "react-native"
import useProfile from "../../Hooks/useProfile";
import Loading from "../loading/Loading";
import Text from "../Text";

import ReviewOptions from "./ReviewOptions";


const ItemSeparator = () => <View style={{height: 10}}></View>

const ReviewsUser = () => {

    const [data, loading, error, refetch] = useProfile(true);

    if(loading){
        return (
            <View style = {{flex: 1}}>
                <Loading />
            </View>
        )
        
    }

    if(error){
        return (
            <View style={{backgroundColor: 'white', paddingTop: 10, flex: 1}}>
                <Text>
                    {`Error ${error.message}`}
                </Text>
            </View>
        )
    }

    console.log("Holala ",data);
    const nodes = data.me ? data.me.reviews.edges.map(edge => edge.node): [];


    return (
        <View style = {stiles.container}>
            <FlatList 
                data={nodes}
                ItemSeparatorComponent={ItemSeparator}
                renderItem={({ item }) => (

                    <ReviewOptions  item={item} refetch={refetch}/>
                 )}
                key={item => item.id}
                style = {{flex: 1}}
            />
        </View>
    )
}

const stiles = StyleSheet.create({
    container: {
        flex: 1
    },

    contianerButton: {
        paddingVertical: 10,
        paddingHorizontal:10 ,
        flexDirection: 'row',
        gap: 15,
        justifyContent: 'center',
    },

    buttonStyle : {
        borderRadius: 4,
        padding: 10,
        paddingHorizontal: 30,
        alignItems: 'center'
    }
})

export default ReviewsUser;