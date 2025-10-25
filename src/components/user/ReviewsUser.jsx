import { View, StyleSheet, FlatList } from "react-native"
import { ReviewItem } from "../reviews/Reviews";
import useProfile from "../../Hooks/useProfile";
import Loading from "../loading/Loading";

const ItemSeparator = () => <View style={{height: 10}}></View>

const ReviewsUser = () => {

    const [data, loading, error] = useProfile(true);

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

    const nodes = data ? data.me.reviews.edges.map(edge => edge.node): [];

    return (
        <View style = {stiles.container}>
            <FlatList 
                data={nodes}
                ItemSeparatorComponent={ItemSeparator}
                renderItem={({ item }) => (
                    <ReviewItem  review={item}/>
                 )}
                key={item => item.id}
            />
        </View>
    )
}

const stiles = StyleSheet.create({
    container: {
        flex: 1
    }
})

export default ReviewsUser;