import React from "react"
import { FlatList, View, StyleSheet, TouchableOpacity } from "react-native"
import Loading from "./loading/Loading";
import RepositoryItem from "./RepositoryItem";
import useRepo from "../Hooks/useRepo";
import { useNavigate } from "react-router-native";


const styles = StyleSheet.create({

    container: {
        flex: 1,
    },

    separator: {
        height: 10,
    },

    containerLoading: {
        flex: 1
    }
});

const ItemSeparator = () => <View style={styles.separator}></View>

export const RepositoryListContainer = ({ data }) => {
    const repositoryNodes = data 
                        ? data.repositories.edges.map(edge => edge.node)
                        : [];
    
    const navigate = useNavigate();

    const onPress = ( id ) => {
        navigate(`/repository/${id}`);
    }

    return (
        <FlatList 
            data={repositoryNodes}
            ItemSeparatorComponent={ItemSeparator}
            renderItem={({item})  =>  (
                <TouchableOpacity onPress={() => onPress(item.id)}>
                    <RepositoryItem props={item}/>
                </TouchableOpacity>
            )}
            keyExtractor={item => item.id}
        />
    )
}

const RepositoryList = () => {

    const { data, loading, refetch } = useRepo();

    if(loading){
        return (
            <View style={styles.containerLoading}>
                <Loading />
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <RepositoryListContainer data={data}/>
        </View>
    )

}

export default RepositoryList;