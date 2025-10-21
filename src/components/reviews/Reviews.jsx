import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import useReview from '../../Hooks/useReview';
import Text from '../Text';

import Loading from '../loading/Loading';

import parseDate from '../../Utils/parseDate';


const ReviewSeparator = () => <View style={styles.separator} />;

const ReviewItem = ({ review }) => {
    return (
        <View style = { styles.containerReviewItem}>
            <View style = { styles.ratingCircle}>
                <Text fontWeight={'bold'} style={{color: '#0366d6'}}>{review.rating}</Text>
            </View> 
            <View style = { styles.containerInfoReview}>
                <View>
                    <Text fontWeight={'bold'}>{review.user.username}</Text>
                    <Text color={'textSecondary'}>{parseDate(review.createdAt)}</Text>
                </View>
                <Text>{review.text}</Text>
            </View>
        </View>
    )
    
}

const Reviews = ( { id } ) => {

    const { data, loading, error } = useReview(id);

    if(loading){
        return (
            <View style = { styles.container}>
                <Loading />
            </View>
        )
    }

    if(error){
        return (
            <View style = { styles.container}>
                <Text color={'red'}>{error.message}</Text>
            </View>
        )
    }

    const reviews = data ? data.repository.reviews.edges.map(edge => edge.node) : [];

    return (
        <View style = {styles.container}>
            <FlatList
                data={reviews}
                ItemSeparatorComponent={ReviewSeparator}
                renderItem={({ item }) => <ReviewItem review={item} />}
                keyExtractor={item => item.id}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 10,
        flex: 1,
    },

    containerReviewItem: {
        flexDirection: 'row',
        padding: 5,
        backgroundColor: 'white',
    },

    containerInfoReview: {
        flexDirection: 'column',
        gap: 6,
        paddingLeft: 10,
        paddingRight: 50,
    },

    ratingCircle: {
        width: 50,
        height: 50,
        borderRadius: 50/2,
        borderColor: '#0366d6',
        borderWidth: 2,
        justifyContent: 'center',
        alignItems: 'center'
    },

    separator : {
        height: 10,
    }
})



export default Reviews; 