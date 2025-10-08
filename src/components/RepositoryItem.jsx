import React from "react";
import { View, Text, StyleSheet } from "react-native";
import PrimaryTarget from "./PrimaryTarget";
import SecondTarget from "./SecondTarget";

const styles = StyleSheet.create({
    flexContainerPrincipal: {
        display: 'flex',
        flexDirection: 'column',
        paddingTop: 10,
        gap: 10,
        backgroundColor: 'white'
        
    }
})

const RepositoryItem = ({props}) => {
    return (
        <View style = {styles.flexContainerPrincipal} testID="Item">
            <PrimaryTarget 
                titule={props.fullName} 
                url={props.ownerAvatarUrl}
                description={props.description} 
                lenguage={props.language}
            />
            <SecondTarget 
                starts={props.stargazersCount}
                forks={props.forksCount}
                reviews={props.reviewCount}
                Rating={props.ratingAverage}
            />
        </View>
    )

}

export default RepositoryItem;