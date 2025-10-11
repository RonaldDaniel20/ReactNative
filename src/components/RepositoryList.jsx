import React from "react"
import { FlatList, View, StyleSheet, TouchableOpacity } from "react-native"
import Loading from "./loading/Loading";
import RepositoryItem from "./RepositoryItem";
import useRepo from "../Hooks/useRepo";
import { useNavigate } from "react-router-native";


const styles = StyleSheet.create({
    separator: {
        height: 10,
    },
});

const ItemSeparator = () => <View style={styles.separator}></View>

export const RepositoryListContainer = ({ data }) => {
    const repositoryNodes = data 
                        ? data.repositories.edges.map(edge => edge.node)
                        : [];
    
    const navigate = useNavigate();

    const onPress = ( id ) => {
        console.log(id);
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
            <View>
                <Loading />
            </View>
        )
    }

    return <RepositoryListContainer data={data}/>

}

export default RepositoryList;