import React from "react";
import { View, StyleSheet, TouchableOpacity, Linking } from "react-native";
import { useParams } from "react-router-native";
import useUniqueRepo from "../../Hooks/useUniqueRepo";
import Loading from "../loading/Loading";
import RepositoryItem from "../RepositoryItem";
import Text from "../Text";

const styles = StyleSheet.create({
    container: {
        gap: 10,
        padding: 6,
        backgroundColor: 'white'
    },

    button: {
        backgroundColor: '#0366d6',
        alignItems: 'center',
        padding: 10,
        borderRadius: 4
    },

    text: {
        color: 'white',
        fontWeight: 'bold'
    }


})

const UniqueRepository = () => {
    const { id } = useParams();
    const { data, loading, error } = useUniqueRepo(id);

    if(loading){
        return (
            <View>
                <Loading />
            </View>
        )
    };

    if(error){
        return (
            <View>
                <Text>{`Error ${error.message}`}</Text>
            </View>
        )
    }

    const repository = data ? data.repository : [];

    
    const handlePress = async () => {
        if(repository.url){
            await Linking.openURL(repository.url);
        };
    }

 
    return (
        <View style = {styles.container}>
            <RepositoryItem props={repository} />
            <TouchableOpacity style = {styles.button} onPress={handlePress}>
                <Text style={styles.text}>Open in GitHub</Text>
            </TouchableOpacity>

        </View>
    )
}

export default UniqueRepository;