import { View, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { ReviewItem } from "../reviews/Reviews";
import Text from "../Text";

import { useNavigate } from "react-router-native";
import useDeleteReview from "../../Hooks/useDeleteReview";

import Loading from "../loading/Loading";

const ReviewOptions = ({ item, refetch }) => {

    const [data, loading, error, deleteReviewUser] = useDeleteReview();

    const navigate = useNavigate();


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


    const navigateToRepository = ( id ) => {
        navigate(`/repository/${id}`);
    }

    const deleteAReview = async ( id ) => {
        await deleteReviewUser({ id })
        refetch();
    }

    const buttonAlert = ( id ) => {
        Alert.alert('Delete review', 
            'Are you sure you want delete this review?',[
                {
                    text: 'CANCEL',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel'
                },
                {
                    text: 'DELETE',
                    onPress: () => deleteAReview(id),
                }
            ]
        )
    }

    return (
        <View style = {{backgroundColor: 'white'}}>
            <View >
                <ReviewItem  review={item}/>
            </View>
            <View style = {stiles.contianerButton}>
                <TouchableOpacity style = {[stiles.buttonStyle, {backgroundColor: '#0366d6'}]}
                    onPress={() => navigateToRepository(item.repositoryId)}
                >
                    <Text style = {{color: 'white', fontWeight: 'bold'}}> View Repository </Text>
                </TouchableOpacity>
                <TouchableOpacity style = {[stiles.buttonStyle, {backgroundColor: '#C24B34'}]}
                    onPress={() => buttonAlert(item.id)}
                >
                    <Text style = {{color: 'white', fontWeight: 'bold'}}> Delete Review </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const stiles = StyleSheet.create({
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

export default ReviewOptions;